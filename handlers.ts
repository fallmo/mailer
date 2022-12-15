import { handler } from "./types.ts";
import { getClient, validateSendMailBody } from "./utils.ts";

export const sendMailHandler: handler = async (req, res, next) => {
  const client = getClient();

  const { error, fields } = validateSendMailBody(req.body);

  if (error) return res.setStatus(400).json({ error: error.message });

  try {
    await client.send({
      from: fields.from || Deno.env.get("SMTP_USERNAME")!,
      to: fields.to,
      subject: fields.subject,
      content: fields.content,
      html: fields.html,
    });

    console.log(`mail => ${fields.to} subject: '${fields.subject}'`);

    await client.close();
    res.setStatus(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    console.log("body: ", fields);
    console.log(err.message);
    res.setStatus(500).json({ error: "Failed to send mail" });
  }
};
