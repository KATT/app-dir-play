"use server";

import { initTRPC } from "@trpc/server";

type Session = {
  user: {
    id: string;
  };
};
const t = initTRPC
  .context<{
    getSession: () => Promise<Session | null>;
  }>()
  .create({});

export const publicProcedure = t.procedure;

const createServerActions = null as any;
const createAction = createServerActions(t, {
  createContext() {},
});
