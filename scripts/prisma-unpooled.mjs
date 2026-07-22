import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const cli = fileURLToPath(new URL("../node_modules/prisma/build/index.js", import.meta.url));
const env = { ...process.env, DATABASE_URL: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL };
const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], { env, stdio: "inherit" });
process.exit(result.status ?? 1);
