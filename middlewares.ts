import { handler } from "./types.ts";

export const basicHttpLogger: handler = (req, _res, next) => {
  const DATA = ["HTTP", req.method, req.url, req.ip, `TS:${Date.now()}`];
  console.log(DATA.join("  "));
  next();
};

export const IsAuthorizedApp: handler = (req, res, next) => {
  const authorizedApps = Deno.env.get("AUTHORIZED_APP_TOKENS");
  if (!authorizedApps) return next();

  const tokens = authorizedApps.split(",").map(tok => tok.trim());
  if (!req.headers.get("authorization")) return res.setStatus(401).json({ error: "Authorization header not set" });

  const client_token = req.headers.get("authorization")!.split(" ")?.[1];
  if (!client_token) return res.setStatus(403).json({ error: "Authorization header invalid" });

  if (tokens.includes(client_token)) return next();
  return res.setStatus(403).json({ error: "Authorization not matching" });
};
