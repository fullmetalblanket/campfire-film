const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to load environment variables from a file
function loadEnv(filePath) {
  const envConfig = require('dotenv').parse(fs.readFileSync(filePath));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

// Load production environment variables
const envPath = path.resolve(process.cwd(), '.env.production');
if (fs.existsSync(envPath)) {
  loadEnv(envPath);
} else {
  console.warn('.env.production file not found. Using default environment.');
}

// Update version
try {
  console.log('Updating version...');
  const output = execSync('npm version patch --no-git-tag-version', { encoding: 'utf8' });
  const newVersion = output.trim();
  console.log(`Version updated successfully to ${newVersion}`);

  // Stage the changed package.json
  execSync('git add package.json package-lock.json', { stdio: 'inherit' });

  // Commit the version change
  execSync(`git commit -m "Bump version to ${newVersion}"`, { stdio: 'inherit' });
  console.log('Version change committed to Git.');

  // Get the current branch name
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

  // Push the changes to the remote repository
  console.log(`Pushing changes to remote branch ${currentBranch}...`);
  execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });
  console.log('Changes pushed to remote repository.');
  
} catch (error) {
  console.error('Failed to update version or commit changes:', error);
  process.exit(1);
}

// Run the build command
try {
  console.log('Starting build process...');
  execSync('next build', { stdio: 'inherit' });
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

console.log('Build, version update, and Git commit completed successfully.');