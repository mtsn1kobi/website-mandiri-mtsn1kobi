// @ts-check

import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import http from "http";
import https from "https";
import cors from "cors";
import bodyParser from "body-parser";
import { newpost } from "./admin/newpost.mjs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { newpostAI } from "./admin/ai.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const portssl = process.env.PORTSSL;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "1GB",
    parameterLimit: 1000000,
  }),
);
app.use(bodyParser.json());
app.use(express.static("public"));

app.route("/").get((req, res) => {
  res.sendFile(
    path.join(dirname(fileURLToPath(import.meta.url)), "admin/index.html"),
  );
});

app.route("/ai").get((req, res) => {
  res.sendFile(
    path.join(dirname(fileURLToPath(import.meta.url)), "admin/ai.html"),
  );
});

app.route("/").post(newpost);
app.route("/ai").post(newpostAI);

const httpServer = http.createServer(app);

if (portssl) {
  const privkeyPath = process.env.privkey || "./privkey.pem";
  const certificatePath = process.env.certificate || "./fullchain.pem";
  const privateKey = fs.readFileSync(privkeyPath, "utf8");
  const certificate = fs.readFileSync(certificatePath, "utf8");
  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(portssl);
}

httpServer.listen(port);

console.log("Express Started on: " + port);
