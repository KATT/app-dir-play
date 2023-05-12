import { AnyProcedure, inferProcedureOutput } from "@trpc/server";

export function asAction<T extends AnyProcedure>(
  proc: T,
): Promise<inferProcedureOutput<T>> {
  // ... call procedure
  throw new Error();
}
