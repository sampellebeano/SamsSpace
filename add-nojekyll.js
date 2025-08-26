// This script creates a .nojekyll file in the dist folder after build
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist', '.nojekyll');
writeFileSync(distPath, '');
console.log('.nojekyll file created in dist folder');
