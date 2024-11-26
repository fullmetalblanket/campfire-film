const { NodeSSH } = require('node-ssh');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.production' });

const serverConfig = {
  host: process.env.SSH_HOST,
  username: process.env.SSH_USERNAME,
  password: process.env.SSH_PASSWORD,
  port: process.env.SSH_PORT,
  remotePath: process.env.SSH_REMOTE_PATH,
  nodeEnvPath: process.env.SSH_NODE_ENV_PATH,
  nodePath: process.env.SSH_NODE_PATH,
  nodePathStartServer: process.env.SSH_NODE_PATH_START_SERVER,
  npmPath: process.env.SSH_NPM_PATH,
};

async function connectSSH() {
  const ssh = new NodeSSH();
  await ssh.connect({
    host: serverConfig.host,
    username: serverConfig.username,
    password: serverConfig.password,
    port: serverConfig.port,
    timeout: 30000,
    readyTimeout: 60000,
  });
  return ssh;
}

async function listNodeProcesses(ssh) {
  const result = await ssh.execCommand("ps aux | grep '[n]ode server.js' || true");
  const processes = result.stdout.trim();
  
  if (processes) {
    console.log(processes);
    return processes;
  } else {
    console.log('No Node.js processes found.');
    return null;
  }
}

async function stopNodeProcess(ssh) {
  console.log('Stopping existing Node.js processes...');
  const { nodePath } = serverConfig;
  
  console.log('Current Node.js processes before stopping:');
  await listNodeProcesses(ssh);

  const stopResult = await ssh.execCommand(`pkill -f '${nodePath} server.js'`);
  console.log('Stop command result:', stopResult.stdout || stopResult.stderr || 'No output');
  
  console.log('Waiting for processes to stop...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log('Checking for remaining Node.js processes:');
  const remainingProcesses = await listNodeProcesses(ssh);

  if (remainingProcesses) {
    console.log('Warning: Some Node.js processes are still running. Attempting force stop...');
    await ssh.execCommand(`pkill -9 -f '${nodePath} server.js'`);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Checking for processes after force stop:');
    const finalCheck = await listNodeProcesses(ssh);
    
    if (finalCheck) {
      console.log('Error: Unable to stop all Node.js processes. Manual intervention may be required.');
    } else {
      console.log('All Node.js processes successfully stopped after force stop.');
    }
  } else {
    console.log('All Node.js processes successfully stopped.');
  }
}

async function startNodeProcess(ssh) {
  console.log('Starting new Node.js process...');

  const { nodeEnvPath, nodePath, nodePathStartServer, npmPath, remotePath } = serverConfig;
  
  try {
    console.log('Sourcing Node.js environment...');
    await ssh.execCommand(`source ${nodeEnvPath}`, { cwd: remotePath });
    
    console.log('Changing to application directory...');
    await ssh.execCommand(`cd ${remotePath}`);

    // console.log('Running npm install...');
    // const npmInstallResult = await ssh.execCommand(`${nodePath} ${npmPath} install`, { cwd: remotePath });
    // console.log('npm install output:', npmInstallResult.stdout || npmInstallResult.stderr || 'No output');
    
    console.log('Executing Node.js start command...');
    const startCommand = `NODE_ENV=production nohup ${nodePathStartServer} server.js > app.log 2>&1 & echo $!`;
    const startResult = await ssh.execCommand(startCommand, { cwd: remotePath });
    
    console.log('Start command executed. Output:', startResult.stdout || startResult.stderr || 'No output');

    if (startResult.stdout) {
      const pid = startResult.stdout.trim();
      console.log(`Node.js process started with PID: ${pid}`);
      
      console.log('Waiting for process to initialize...');
      await new Promise(resolve => setTimeout(resolve, 5000));

      console.log('Checking if process is running...');
      const checkResult = await ssh.execCommand(`ps -p ${pid} -o comm=`);
      console.log('Process check result:', checkResult.stdout || checkResult.stderr);
      
      if (checkResult.stdout.includes('node')) {
        console.log('Node.js process is running.');
      } else {
        console.log('Warning: Node.js process not found after starting.');
      }

      console.log('Checking application log...');
      const logResult = await ssh.execCommand('tail -n 20 app.log', { cwd: remotePath });
      console.log('Last 20 lines of app.log:');
      console.log(logResult.stdout || logResult.stderr || 'No log output');
    } else {
      console.log('Warning: No PID returned when starting the Node.js process.');
    }

    console.log('Final check of running Node.js processes:');
    await listNodeProcesses(ssh);

  } catch (error) {
    console.error('Error starting Node.js process:', error);
  }
}

module.exports = {
  connectSSH,
  stopNodeProcess,
  startNodeProcess,
};