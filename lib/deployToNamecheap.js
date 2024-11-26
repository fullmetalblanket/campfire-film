 const { spawn } = require('child_process');
const fs = require('fs');
const tar = require('tar');
// const { NodeSSH } = require('node-ssh');
const FtpClient = require('ftp');
const dotenv = require('dotenv');
// import runDiagnostics from './runDiagnostics';  
const { connectSSH, stopNodeProcess, startNodeProcess } = require('./sshHelpers');


dotenv.config({ path: '.env.production' });

// const ssh = new NodeSSH();

const serverConfig = {
  host: process.env.SSH_HOST,
  username: process.env.SSH_USERNAME,
  password: process.env.SSH_PASSWORD,
  port: process.env.SSH_PORT,
  remotePath: process.env.SSH_REMOTE_PATH,
  gzipFileName: 'next-app',
  ftpConfig: {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    port: process.env.FTP_PORT,
  }
};

function logEnvironmentVariables() {
  console.log('Environment Variables:');
  console.log(`FTP_PASSWORD: ${process.env.FTP_PASSWORD ? 'Set' : 'Not Set'}`);
  console.log(`SSH_PASSWORD: ${process.env.SSH_PASSWORD ? 'Set' : 'Not Set'}`);
}

async function buildAndDeploy() {
  const startTime = new Date();
  console.log('start time',startTime);
  const outputFile = `${serverConfig.gzipFileName}.tar.gz`;
  
  try {
    logEnvironmentVariables();

    // npm run build:prod
    console.log('Running npm build...');
    await new Promise((resolve, reject) => {
      const build = spawn('npm', ['run', 'build:prod'], { stdio: 'inherit' });

      build.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Build process exited with code ${code}`));
        } else {
          resolve();
        }
      });

      build.on('error', (err) => {
        reject(new Error(`Failed to start build process: ${err}`));
      });
    });

    console.log('Zipping files...');
    await tar.create(
      {
        gzip: true,
        file: outputFile,
        cwd: '.',
      },
      ['.next', 'public', 'server.js', 'package.json', 'package-lock.json']
    );

    console.log(`${outputFile} has been created.`);
    console.log('Uploading .gz file to the server...');
    
    await ftpUpload(outputFile);

    console.log('FTP upload completed. Starting SSH operations...');
    await sshConnectAndDeploy();

    console.log('Deployment process completed successfully.');
  } catch (error) {
    console.error(`Deployment failed: ${error}`);
  } finally {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
      console.log(`Deleted local archive file: ${outputFile}`);
    }

    const endTime = new Date();
    const elapsedTime = (endTime - startTime) / 1000;
    const updatedPackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const updatedVersion = updatedPackageJson.version;
    console.log(`Deployed version ${updatedVersion} in ${elapsedTime} seconds`);
  }
}

function ftpUpload(file) {
  return new Promise((resolve, reject) => {
    const client = new FtpClient();

    client.on('ready', () => {
      console.log('FTP connection established.');
      console.log(`Attempting to upload file: ${file}`);
      
      const fileSize = fs.statSync(file).size;
      let uploadedSize = 0;
      
      const fileStream = fs.createReadStream(file);
      
      fileStream.on('data', (chunk) => {
        uploadedSize += chunk.length;
        const progress = (uploadedSize / fileSize * 100).toFixed(2);
        process.stdout.write(`\rUpload progress: ${progress}% | ${uploadedSize} / ${fileSize} bytes`);
      });

      client.put(fileStream, `/${file}`, (err) => {
        if (err) {
          console.error('\nError during file upload:', err);
          client.end();
          reject(err);
        } else {
          console.log('\nFile uploaded successfully.');
          client.end();
          resolve();
        }
      });
    });

    client.on('error', (err) => {
      console.error('FTP connection error:', err);
      reject(err);
    });

    client.on('close', (hadError) => {
      console.log(`FTP connection closed. Had error: ${hadError}`);
    });

    client.on('end', () => {
      console.log('FTP connection ended.');
    });

    const connectOptions = {
      host: serverConfig.ftpConfig.host,
      user: serverConfig.ftpConfig.user,
      password: serverConfig.ftpConfig.password,
      port: serverConfig.ftpConfig.port,
      secure: false,
      secureOptions: { rejectUnauthorized: false },
      connTimeout: 60000, // 60 seconds timeout
      pasvTimeout: 60000,
      keepalive: 60000,
    };

    console.log(`Attempting to connect to ${connectOptions.host}:${connectOptions.port} with user ${connectOptions.user}`);
    client.connect(connectOptions);
  });
}

async function sshConnectAndDeploy() {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      console.log(`Connecting to server via SSH (attempt ${retries + 1})...`);
      ssh = await connectSSH();
      // await ssh.connect({
      //   host: serverConfig.host,
      //   username: serverConfig.username,
      //   password: serverConfig.password,
      //   port: serverConfig.port,
      //   timeout: 30000,
      //   readyTimeout: 60000,
      // });

      console.log('SSH connection established.');

      // Activate Node.js virtual environment
      console.log('Activating Node.js virtual environment...');
      await ssh.execCommand('source /home/metaoaqs/nodevenv/metacyp/20/bin/activate && cd /home/metaoaqs/metacyp', { cwd: serverConfig.remotePath });

      // Verify the remote path
      console.log('Verifying remote path...');
      const pathCheck = await ssh.execCommand('pwd && ls -la', { cwd: serverConfig.remotePath });
      console.log('Current directory contents:', pathCheck.stdout || pathCheck.stderr);

      // Check if archive exists
      const checkArchive = await ssh.execCommand(`ls -l ${serverConfig.gzipFileName}.tar.gz`, { cwd: serverConfig.remotePath });
      console.log('Check archive result:', checkArchive.stdout || checkArchive.stderr);

      // Unpack the uploaded archive
      console.log('Unpacking the uploaded archive...');
      const unpackResult = await ssh.execCommand(`tar -xzvf ${serverConfig.gzipFileName}.tar.gz`, { cwd: serverConfig.remotePath });
      console.log('Unpack result:', unpackResult.stdout || unpackResult.stderr);

      // Check if .next, public folders and server.js now exist
      const checkFoldersAfter = await ssh.execCommand('ls -l .next public server.js', { cwd: serverConfig.remotePath });
      console.log('Check folders after unpacking:', checkFoldersAfter.stdout || checkFoldersAfter.stderr);

      // Delete the archive
      console.log('Deleting the uploaded archive...');
      const deleteArchiveResult = await ssh.execCommand(`rm ${serverConfig.gzipFileName}.tar.gz`, { cwd: serverConfig.remotePath });
      console.log('Delete archive result:', deleteArchiveResult.stdout || deleteArchiveResult.stderr);

      await stopNodeProcess(ssh);
      await startNodeProcess(ssh);

      console.log('SSH operations completed successfully.');
      break;

    } catch (error) {
      console.error(`SSH Deployment error (attempt ${retries + 1}):`, error);
      retries++;
      if (retries >= maxRetries) {
        console.error('Max retries reached. SSH operations failed.');
        throw error;
      } else {
        console.log(`Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } finally {
      ssh.dispose();
    }
  }
}

buildAndDeploy();