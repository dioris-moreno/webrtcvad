const fs = require("fs");
const path = require("path");

const esmPath = path.join(__dirname, "../lib/esm");

// Ensure the directory exists
if (!fs.existsSync(esmPath)) {
    fs.mkdirSync(esmPath, { recursive: true });
}

// Write package.json inside lib/esm
fs.writeFileSync(path.join(esmPath, "package.json"), JSON.stringify({ type: "module" }, null, 2) + "\n");

console.log("✅ lib/esm/package.json created successfully.");
