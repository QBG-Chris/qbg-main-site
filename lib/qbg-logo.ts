import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function getQbgLogoDataUri() {
  const logo = await readFile(join(process.cwd(), "public", "icon0.svg"));
  return `data:image/svg+xml;base64,${logo.toString("base64")}`;
}

