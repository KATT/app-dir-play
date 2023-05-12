import { initTRPC } from "@trpc/server";
import { createServerActionHandler } from "../_lib";

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

// Idea of procedure that can handle both form data and called as action
export const serverActionProc = publicProcedure.use((opts) => {
  if (opts.rawInput instanceof FormData) {
    return opts.next({
      rawInput: Object.fromEntries(opts.rawInput),
    });
  }
  return opts.next();
});

export const createAction = createServerActionHandler(t, {
  createContext() {
    return {
      async getSession() {
        // TODO
        return null;
      },
    };
  },
});
