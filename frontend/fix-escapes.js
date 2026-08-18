import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  'src/pages/Tasks.tsx',
  'src/pages/Habits.tsx',
  'src/pages/Dashboard.tsx'
];

files.forEach(file => {
  const p = path.join(__dirname, file);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/\\\$\{/g, '${');
  content = content.replace(/\\`/g, '`');
  fs.writeFileSync(p, content);
});
console.log('Fixed escapes.');
