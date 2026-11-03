const fs = require('fs');
const path = require('path');

const src = 'C:/Users/L E N O V O/.gemini/antigravity-ide/brain/e6445fc5-d3e4-4ff0-afa2-e28d77dd65fd/.user_uploaded/media_1793657862765.jpg';
const dest = path.join(__dirname, '../public/assets/images/hero-kaaba-bg.jpg');

fs.copyFileSync(src, dest);
console.log('Copied successfully:', dest);
console.log('File size:', fs.statSync(dest).size);
