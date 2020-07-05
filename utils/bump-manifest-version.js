const fs = require('fs');

const manifest = JSON.parse(fs.readFileSync("src/manifest.json"));

manifest.version = process.env.npm_package_version.replace(/^(\d+)\.?(\d+)\.?(\*|\d+)$/, '$1.$2')

fs.writeFileSync("src/manifest.json", JSON.stringify(manifest, null, 4));