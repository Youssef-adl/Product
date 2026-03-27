import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(directoryPath, function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Only replace the route literal '/store'
    let newContent = content.replace(/["'`]\/store["'`]/g, '"/boutique"');
    
    // Also replace in React Router if there's any dynamic construction like to="/store"
    newContent = newContent.replace(/to="\/store"/g, 'to="/boutique"');
    newContent = newContent.replace(/path="\/store"/g, 'path="/boutique"');

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`Updated route in: ${filePath}`);
    }
  }
});
