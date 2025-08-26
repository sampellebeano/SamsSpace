// This script creates a CNAME file in the dist folder for GitHub Pages custom domain
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cnamePath = join(__dirname, 'dist', 'CNAME');
writeFileSync(cnamePath, '5amgreen.com');
console.log('CNAME file created in dist folder');
