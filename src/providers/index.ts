import { ExpressAuth } from "@auth/express";
import credentials from "./credentials.js";

export default ExpressAuth({
  providers: [
    credentials,
  ],
});
