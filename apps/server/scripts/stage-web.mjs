/**
 * SideRail - Xray-core VPN management panel
 * Copyright (c) 2025 icubaby. All rights reserved.
 * Official repository: https://github.com/icubaby/SideRail
 *
 * Licensed under the SideRail Proprietary License (see LICENSE).
 * Unauthorized selling, white-labeling, or removal of attribution,
 * branding, or the embedded authorship identifiers is prohibited.
 * Watermark: sr-icubaby-2025-9f4c1a7e
 *
 * Build-time helper: stages the pre-built frontend (apps/web/dist) into the
 * server build output (apps/server/dist/public). Every deployment builder
 * (Docker, Railway Railpack/Nixpacks, Shiprr) must ship apps/server/dist,
 * because that is what the start command runs — so nesting the panel files
 * there guarantees they reach the runtime image under ANY builder.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url)); // apps/server/scripts
const webDist = path.resolve(here, "..", "..", "web", "dist"); // apps/web/dist
const target = path.resolve(here, "..", "dist", "public"); // apps/server/dist/public

if (fs.existsSync(webDist)) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(webDist, target, { recursive: true });
  console.log(`[stage-web] staged frontend: ${webDist} -> ${target}`);
} else {
  console.warn(`[stage-web] WARNING: ${webDist} not found; frontend not staged.`);
  console.warn("[stage-web] Commit apps/web/dist to the repo (it is the pre-built panel).");
  process.exitCode = 1;
}
