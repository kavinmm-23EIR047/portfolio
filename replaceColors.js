const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'portfolio/src/components');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace Tailwind class brackets first
  // e.g., bg-[#0A4FE0] -> bg-brand-indigo
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#0A4FE0\]/gi, '$1-brand-indigo');
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#4DA8FF\]/gi, '$1-brand-indigo-light');
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#C9CFDA\]/gi, '$1-brand-dark-green'); // Since brand-dark-green is now silver mist
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#F5F6F8\]/gi, '$1-bg-light');
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#f59e0b\]/gi, '$1-brand-orange');
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#e65c00\]/gi, '$1-brand-orange-hover');
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#e11d48\]/gi, '$1-brand-orange'); // Mapping random red to orange
  content = content.replace(/([a-zA-Z0-9_-]+)-\[#0284c7\]/gi, '$1-brand-indigo'); // Mapping random blue to indigo

  // Replace SVGs or inline styles with CSS variables
  content = content.replace(/#0A4FE0/gi, 'var(--brand-indigo)');
  content = content.replace(/#4DA8FF/gi, 'var(--brand-indigo-light)');
  content = content.replace(/#C9CFDA/gi, 'var(--border-light)'); // Or brand-dark-green depending on context, using border-light for SVGs is okay
  content = content.replace(/#F5F6F8/gi, 'var(--bg-light)');
  content = content.replace(/#5542f6/gi, 'var(--brand-indigo)');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      traverseDirectory(filePath);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      replaceColorsInFile(filePath);
    }
  });
}

traverseDirectory(directoryPath);
console.log('Color replacement complete.');
