import PocketBase from "pocketbase";
import { execSync } from "child_process";
import { randomBytes } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import * as readline from "readline";

const PB_URL = "https://sekolah-backend.sg2.app.web.id";
const ADMIN_EMAIL = "yokowasis@gmail.com";
const ADMIN_PASSWORD = "6BS5qXPxRH8eZf";
const ROOT_DIR = join(__dirname, "..");
const TENANT_PATH = join(ROOT_DIR, "lib", "tenant.json");

function generatePassword(length = 16): string {
  return randomBytes(length)
    .toString("base64")
    .slice(0, length)
    .replace(/\+/g, "A")
    .replace(/\//g, "B")
    .replace(/=/g, "C");
}

function readTenants(): Record<string, string> {
  try {
    return JSON.parse(readFileSync(TENANT_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeTenants(data: Record<string, string>) {
  writeFileSync(TENANT_PATH, JSON.stringify(data, null, 2) + "\n");
}

function prompt(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim());
    }),
  );
}

async function main() {
  console.log("Pulling latest commit version...");
  execSync("git pull", { stdio: "inherit", cwd: ROOT_DIR });

  let hostname = process.argv[2];

  if (!hostname) {
    hostname = await prompt("Hostname (e.g. sman72jakarta.sch.id): ");
  }
  if (!hostname) {
    console.error("Hostname is required.");
    process.exit(1);
  }

  const email = `admin@${hostname}`;

  const password = generatePassword();

  const pb = new PocketBase(PB_URL);

  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
  } catch (err: any) {
    console.error("Failed to authenticate as superuser:", err.message);
    process.exit(1);
  }

  let user: any;
  try {
    user = await pb.collection("users").create({
      email,
      password,
      passwordConfirm: password,
      verified: true,
      emailVisibility: false,
      name: hostname,
    });
  } catch (err: any) {
    console.error("Failed to create user:", err.message);
    process.exit(1);
  }

  try {
    await pb.collection("school_settings").create({
      tenant: user.id,
      nama_sekolah: "Sekolah Kita",
      title: "Website Resmi",
      telepon: "",
      email: email,
      alamat: "",
      jam_kerja: "",
      sekilas_info: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      tentang_kepsek: "",
      home_background: "",
      video: "",
      logo: "",
      about_image: "",
      popup: "",
    });
    console.log("  Default school settings created.");
  } catch (err: any) {
    console.warn("  Warning: Failed to create school settings:", err.message);
  }

  const tenants = readTenants();
  tenants[hostname] = user.id;
  writeTenants(tenants);

  console.log("\nCommitting and pushing changes...");
  execSync("git add lib/tenant.json", { stdio: "inherit", cwd: ROOT_DIR });
  execSync(`git commit -m "Add tenant: ${hostname}"`, { stdio: "inherit", cwd: ROOT_DIR });
  execSync("git push", { stdio: "inherit", cwd: ROOT_DIR });

  console.log("\nTenant created successfully!");
  console.log("  ID:       " + user.id);
  console.log("  Email:    " + email);
  console.log("  Password: " + password);
  console.log("  Hostname: " + hostname);
  console.log("  Login: " + hostname + "/admin/login");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
