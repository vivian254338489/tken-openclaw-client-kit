import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const generatedDir = path.join(root, "generated");
const generatedConfig = path.join(generatedDir, "openclaw.tken.json");

function fileExists(file) {
  return fs.existsSync(path.join(root, file));
}

function readEnvShape() {
  return {
    hasTkenApiKey: Boolean(process.env.TKEN_API_KEY),
    hasTkenBaseUrl: Boolean(process.env.TKEN_BASE_URL),
    hasDefaultModel: Boolean(process.env.TKEN_DEFAULT_MODEL),
    hasPremiumModel: Boolean(process.env.TKEN_PREMIUM_MODEL),
  };
}

function readGeneratedShape() {
  if (!fs.existsSync(generatedConfig)) return { exists: false };
  try {
    const config = JSON.parse(fs.readFileSync(generatedConfig, "utf8"));
    return {
      exists: true,
      providerCount: Array.isArray(config.providers) ? config.providers.length : 0,
      defaultProvider: config.routing?.defaultProvider,
      defaultModel: config.routing?.defaultModel,
      premiumModel: config.routing?.premiumModel,
    };
  } catch (error) {
    return { exists: true, parseError: error.message };
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  package: "tken-openclaw-client-kit",
  version: "standalone",
  system: {
    platform: process.platform,
    arch: process.arch,
    node: process.version,
    os: `${os.type()} ${os.release()}`,
  },
  files: {
    install: fileExists("install.mjs"),
    preflight: fileExists("preflight.mjs"),
    configExample: fileExists("config.example.json"),
    envExample: fileExists(".env.example"),
    quickTest: fileExists("quick-test.sh"),
    startBat: fileExists("START.bat"),
    startSh: fileExists("START.sh"),
  },
  env: readEnvShape(),
  generated: readGeneratedShape(),
};

fs.mkdirSync(generatedDir, { recursive: true });
const outPath = path.join(generatedDir, "support-report.json");
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`Generated ${path.relative(root, outPath).replaceAll("\\", "/")}`);
