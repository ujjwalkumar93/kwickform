#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs");
const path = require("path");

// Define the command using Commander
program
  .command("create-app <appName>")
  .description("Create a new app with necessary folder and file structure")
  .action((appName) => {
    createAppStructure(appName);
  });

program.parse(process.argv);


function createAppStructure(appName) {
  const appDir = path.join(process.cwd(),"apps", appName);

  if (fs.existsSync(appDir)) {
    console.error(`Error: Directory ${appName} already exists.`);
    process.exit(1);
  }

  // Create the main app folder
  fs.mkdirSync(appDir);

  // Create subdirectories and files
  const folders = ["src", "src/components", "src/routes", "public", "config"];
  folders.forEach((folder) => {
    const folderPath = path.join(appDir, folder);
    fs.mkdirSync(folderPath, { recursive: true });
  });

  // Create sample files
  fs.writeFileSync(path.join(appDir, "src", "index.js"), getIndexJsTemplate());
  fs.writeFileSync(
    path.join(appDir, "config", "default.json"),
    getConfigTemplate()
  );

  console.log(`App ${appName} has been created successfully!`);
}

// Template for index.js file
function getIndexJsTemplate() {
  return `
  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
  });
  `;
}

// Template for config file (config/default.json)
function getConfigTemplate() {
  return JSON.stringify(
    {
      appName: "My Custom App",
      port: 3000,
    },
    null,
    2
  );
}
