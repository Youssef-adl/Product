import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'src');

const replacements = {
  'text-white/60': 'text-solar-text-secondary',
  'text-white/50': 'text-solar-text-secondary',
  'text-white/40': 'text-solar-text-muted',
  'text-white/30': 'text-solar-text-muted',
  'text-white/20': 'text-solar-text-muted',
  'text-white/10': 'text-solar-text-muted opacity-50',
  'text-white': 'text-solar-text-primary',
  'bg-carbon-black': 'bg-solar-bg-primary',
  'bg-inky-carbon': 'bg-solar-bg-secondary',
  'bg-black': 'bg-solar-bg-primary',
  'text-lando-yellow': 'text-solar-accent-sun',
  'bg-lando-yellow': 'bg-solar-accent-sun',
  'text-zinc-400': 'text-solar-text-secondary',
  'bg-zinc-900': 'bg-solar-bg-secondary',
  'text-gray-400': 'text-solar-text-secondary',
  'text-gray-300': 'text-solar-text-secondary'
};

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
    
    // Ordered to ensure specific replacements (like text-white/60) happen before general ones (text-white)
    Object.keys(replacements).forEach(key => {
      // Use regex to match exact class name bounded by spaces, quotes or backticks
      // We escape the key for regex
      const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?<=['"\`\\s])${escapedKey}(?=['"\`\\s])`, 'g');
      content = content.replace(regex, replacements[key]);
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated classes in: ${filePath}`);
    }
  }
});
