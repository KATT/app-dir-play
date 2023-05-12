"use client";
import { useCallback, useMemo, useRef, useState } from "react";

export function useAction<TAction extends (...args: any[]) => Promise<any>>(
  action: TAction,
  opts?: {
    onSuccess?: (data: Awaited<ReturnType<TAction>>) => void;
    onError?: (error: unknown) => void;
  },
) {
  const [state, setState] = useState<
    | { status: "idle" }
    | {
        status: "pending";
      }
    | {
        status: "error";
        error: unknown;
      }
    | {
        status: "success";
        data: unknown;
      }
  >({
    status: "idle",
  });

  const optsRef = useRef(opts);
  optsRef.current = opts;

  const mutate = useCallback(
    (...args: Parameters<TAction>) => {
      if (state.status === "pending") {
        return;
      }
      setState({ status: "pending" });
      action(...args)
        .then((data) => {
          optsRef.current?.onSuccess?.(data);
          setState({ status: "success", data });
        })
        .catch((error) => {
          optsRef.current?.onError?.(error);
          setState({ status: "error", error });
        });
    },
    [state, action],
  );
  return useMemo(
    () => ({
      ...state,
      mutate,
    }),
    [state, mutate],
  );
}
