import { Router, json } from "https://deno.land/x/opine@2.0.0/mod.ts";
import { IsAuthorizedApp } from "./middlewares.ts";
import { sendMailHandler } from "./handlers.ts";
const router = Router();

router.get("/", (_req, res) => res.send("ok\n"));

router.post("/send-mail", IsAuthorizedApp, json(), sendMailHandler);

export default router;
