import { OpineRequest, OpineResponse, NextFunction } from "https://deno.land/x/opine@2.0.0/mod.ts";

export type handler = (
  req: OpineRequest,
  res: OpineResponse,
  next: NextFunction
  // deno-lint-ignore no-explicit-any
) => any | Promise<any>;
