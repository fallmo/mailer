import { SMTPClient } from "https://deno.land/x/denomailer@1.5.2/mod.ts";
import Schema, { string } from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";

export function ensureEnvironment() {
  const requiredVars: string[] = ["SMTP_HOST", "SMTP_USERNAME", "SMTP_PASSWORD", "SMTP_PORT", "SMTP_TLS"];

  for (const val of requiredVars) {
    if (Deno.env.get(val)) continue;
    console.error(`Missing '${val}' Environment Variable`);
    Deno.exit(1);
  }

  if (!Deno.env.get("AUTHORIZED_APP_TOKENS")) {
    console.log(`Warning: no 'AUTHORIZED_APP_TOKENS' env set. Accepting all requests.`);
  }
}

function stringToBool(string?: string) {
  if (!string) return false;
  string = string.trim();

  if (string === "false") return false;
  if (string === "0") return false;
  if (string === "no") return false;

  return true;
}

// let client: SMTPClient | null;

export function getClient() {
  // if(client) return client;

  // client = new SMTPClient({
  //   connection: {
  //     hostname: Deno.env.get("SMTP_HOST")!,
  //     port: +Deno.env.get("SMTP_PORT")!,
  //     tls: stringToBool(Deno.env.get("SMTP_TLS")),
  //     auth: {
  //       username: Deno.env.get("SMTP_USERNAME")!,
  //       password: Deno.env.get("SMTP_PASSWORD")!,
  //     },
  //   },
  // });

  // return client;
  return new SMTPClient({
    connection: {
      hostname: Deno.env.get("SMTP_HOST")!,
      port: +Deno.env.get("SMTP_PORT")!,
      tls: stringToBool(Deno.env.get("SMTP_TLS")),
      auth: {
        username: Deno.env.get("SMTP_USERNAME")!,
        password: Deno.env.get("SMTP_PASSWORD")!,
      },
    },
  });
}

// deno-lint-ignore no-explicit-any
export function validateSendMailBody(body: any) {
  const validator = Schema({
    to: string.trim().toLowerCase(),
    from: string.trim().optional(), // optional from
    subject: string.trim(),
    content: string.trim().optional(),
    html: string.trim().optional(),
  }).destruct();

  const [error, fields] = validator(body);

  if (error) return { error, fields };

  if (!fields?.content && !fields?.html) {
    return { error: { message: `Must include either 'content' or 'html' or both` }, fields };
  }

  return { error: null, fields };
}
