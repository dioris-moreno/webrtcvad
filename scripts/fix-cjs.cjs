const fs = require("fs");
const path = require("path");

const cjsPath = path.join(__dirname, "../lib/cjs");

// Ensure the directory exists
if (!fs.existsSync(cjsPath)) {
    fs.mkdirSync(cjsPath, { recursive: true });
}

// Write package.json inside lib/cjs
fs.writeFileSync(path.join(cjsPath, "package.json"), JSON.stringify({ type: "commonjs" }, null, 2) + "\n");

console.log("✅ lib/cjs/package.json created successfully.");
