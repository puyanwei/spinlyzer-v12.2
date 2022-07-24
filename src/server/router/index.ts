// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { spinlyzerRouter } from "./spinlyzer";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("spinlyzer.", spinlyzerRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
