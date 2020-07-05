const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync("src/manifest.json"));

console.log(manifest, process.env.npm_package_version);
// fs.writeFileSync("file.json", JSON.stringify(data, null, 4));