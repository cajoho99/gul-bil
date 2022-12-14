// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedExampleRouter } from "./protected-example-router";
import { gameRouter } from "./game";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("question.", protectedExampleRouter)
  .merge("game.", gameRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
