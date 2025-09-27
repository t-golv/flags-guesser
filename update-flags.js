import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths (relative, not absolute)
const inputPath = path.join(__dirname, "src", "assets", "flags.json");
const outputPath = path.join(__dirname, "src", "assets", "flags-updated.json");

// Load JSON
const rawData = fs.readFileSync(inputPath, "utf-8");
const flags = JSON.parse(rawData);

// Process each entry
const updatedFlags = flags.map((flag) => {
  const newName = flag.name.toLowerCase().replace(/\s+/g, "-");
  return {
    ...flag,
    flag: `/flags/${newName}.jpg`,
  };
});

// Save new JSON
fs.writeFileSync(outputPath, JSON.stringify(updatedFlags, null, 2), "utf-8");
console.log(`Updated JSON saved to ${outputPath}`);
