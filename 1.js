const fs = require('fs');
const { fetch } = require('./lib/assets/func')
const path = require('path');

function version() {
  const a = path.join(__dirname, 'package.json');
  const b = fs.readFileSync(a, 'utf8');
  
  try {
    const { author, version, license } = JSON.parse(b);
    
    // Access the author field
    const data = fetch(hostAPI + 'version/bot?q=1.0rc')
  } catch (error) {
    console.error('Error parsing package.json:', error.message);
  }
}

version();


