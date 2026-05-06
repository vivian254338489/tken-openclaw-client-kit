import fs from "node:fs";
import path from "node:path";

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index !== -1 && process.argv[index + 1]) return process.argv[index + 1];
  return fallback;
}

const baseUrl = arg("--base-url", process.env.TKEN_BASE_URL || "https://www.tken.shop/v1");
const defaultModel = arg("--default-model", process.env.TKEN_DEFAULT_MODEL || "tken-free-model");
const premiumModel = arg("--premium-model", process.env.TKEN_PREMIUM_MODEL || "premium-gpt-model");

const outDir = path.resolve("generated");
fs.mkdirSync(outDir, { recursive: true });

const config = {
  providers: [
    {
      name: "tken",
      type: "openai-compatible",
      baseUrl,
      apiKeyEnv: "TKEN_API_KEY",
      models: [defaultModel, premiumModel],
    },
  ],
  routing: {
    defaultProvider: "tken",
    defaultModel,
    premiumModel,
  },
};

const outFile = path.join(outDir, "openclaw.tken.json");
fs.writeFileSync(outFile, JSON.stringify(config, null, 2));
console.log(`Generated ${outFile}`);
