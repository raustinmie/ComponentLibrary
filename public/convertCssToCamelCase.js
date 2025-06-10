const fs = require('fs');
const path = require('path');

// Regex to match .foo-bar { and capture 'foo-bar'
const regex = /\.([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)+)(?=\s*\{)/g;

/**
 * Convert kebab-case to camelCase
 */
function kebabToCamel(str) {
  return str.replace(/-([a-zA-Z0-9])/g, (_, char) => char.toUpperCase());
}

function convertFile(filePath, outputPath = filePath) {
  const css = fs.readFileSync(filePath, 'utf-8');

  const result = css.replace(regex, (_, className) => {
    const camel = kebabToCamel(className);
    return `.${camel}`;
  });

  fs.writeFileSync(outputPath, result, 'utf-8');
  console.log(`✔ Converted: ${filePath}`);
}

// Get the file path from the command-line argument
const inputPath = process.argv[2]; // The first argument should be the input file name
if (!inputPath) {
  console.error('Please provide the path to the CSS file.');
  process.exit(1);
}

// Optional: output to a new file or overwrite the original file
const outputPath = process.argv[3] || inputPath; // If a second argument exists, use it as output path

// Convert the given file
convertFile(inputPath, outputPath);
