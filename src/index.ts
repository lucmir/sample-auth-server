import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import providers from "./providers/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("hello");
});

// If app is served through a proxy, trust the proxy to allow HTTPS protocol to be detected
// https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', true);
app.use("/auth/*", providers);

console.log(app._router.stack);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

