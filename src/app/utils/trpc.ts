"use server";

import {
  AnyProcedure,
  MaybePromise,
  inferProcedureInput,
  inferProcedureOutput,
  initTRPC,
} from "@trpc/server";

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

// FIXME: use internal generic
type TRPCInstance = typeof t;
function createServerActionHandler<TInstance extends TRPCInstance>(
  t: TRPCInstance,
  opts: {
    createContext: () => MaybePromise<TRPCInstance["_config"]["$types"]["ctx"]>;
  },
) {
  return function createServerAction<TProc extends AnyProcedure>(proc: TProc) {
    return async function invoke(input: inferProcedureInput<TProc>) {
      // TODO error handling
      return proc({
        input: undefined,
        ctx: await opts.createContext(),
        path: "serverAction",
        rawInput: input,
        type: proc._type,
      }) as inferProcedureOutput<TProc> & {
        $proc: TProc;
      };
    };
  };
}

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
