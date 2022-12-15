import { opine } from "https://deno.land/x/opine@2.0.0/mod.ts";
import { basicHttpLogger } from "./middlewares.ts";
import { ensureEnvironment } from "./utils.ts";
import mailRoutes from "./routes.ts";

const app = opine();

app.use(basicHttpLogger);

app.use(mailRoutes);

ensureEnvironment();

const port = Deno.env.get("PORT") ? +Deno.env.get("PORT")! : 8080;

app.listen({ port });

console.log(`Server listening on port ${port}`);
