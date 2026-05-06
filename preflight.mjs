import fs from "node:fs";

const failures = [];
const major = Number.parseInt(process.versions.node.split(".")[0], 10);

if (!Number.isFinite(major) || major < 20) {
  failures.push(`Node.js 20+ is required. Current version: ${process.version}`);
}

for (const file of ["install.mjs", "config.example.json", ".env.example", "quick-test.sh"]) {
  if (!fs.existsSync(file)) failures.push(`Missing required file: ${file}`);
}

if (failures.length) {
  console.error("Preflight failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, preflight: "passed" }, null, 2));
