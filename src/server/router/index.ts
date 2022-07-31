// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedExampleRouter } from "./protected-example-router";
import { gameRouter } from "./game";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("question.", protectedExampleRouter)
  .merge("game.", gameRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
