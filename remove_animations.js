import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src');

const classesToRemove = [
  'animate-bounce-subtle',
  'animate-in',
  'fade-in',
  'slide-in-from-bottom',
  'slide-in-from-left',
  'slide-in-from-right',
  'animate-shake',
  'animate-pulse-sun',
  'delay-100',
  'delay-200',
  'duration-1000',
  'duration-700'
];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(directoryPath, function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;
    
    classesToRemove.forEach(cls => {
      const regex = new RegExp(`\\b${cls}\\b\\s*`, 'g');
      content = content.replace(regex, '');
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
