import type {
  AnyProcedure,
  AnyRootConfig,
  DataTransformer,
  MaybePromise,
  inferProcedureOutput,
} from "@trpc/server";

type AnyTObject = {
  _config: AnyRootConfig;
  transformer?: DataTransformer;
  // errorFormatter?: ErrorFormatter<any, any>;
  // ...
};

export function createServerActionHandler<TInstance extends AnyTObject>(
  t: TInstance,
  opts: {
    createContext: () => MaybePromise<TInstance["_config"]["$types"]["ctx"]>;
  }
) {
  return function createServerAction<TProc extends AnyProcedure>(proc: TProc) {
    return async function invoke(input: unknown) {
      // TODO error handling
      return proc({
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
