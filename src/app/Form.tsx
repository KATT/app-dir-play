"use client";

import { twMerge } from "tailwind-merge";
import { experimental_useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useAction } from "./useAction";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type SubmitButtonProps = Overwrite<
  JSX.IntrinsicElements["button"],
  {
    type?: "submit";
    pendingProps?: Omit<SubmitButtonProps, "pendingProps">;
  }
>;
export function SubmitButton(props: SubmitButtonProps) {
  const formStatus = experimental_useFormStatus();

  const { pendingProps, ...other } = props;

  return (
    <button
      {...other}
      {...(formStatus.pending && pendingProps)}
      type='submit'
      className={twMerge(
        props.className,
        formStatus.pending && props.pendingProps?.className,
      )}
    />
  );
}

export function Form(
  props: Overwrite<
    JSX.IntrinsicElements["form"],
    {
      action: (fn: FormData) => Promise<unknown>;
      method?: "POST";
    }
  >,
) {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const action = useAction(props.action, {
    onSuccess(data) {
      alert("onSuccess:" + JSON.stringify(data, null, 4));
      router.refresh();
      ref.current?.reset();
    },
    onError(data) {
      alert("onError:" + JSON.stringify(data, null, 4));
    },
  });
  return (
    <>
      <form {...props} action={props.action} method='POST' ref={ref}>
        {props.children}
      </form>

      <button
        type='button'
        className={twMerge(
          "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
          action.status === "pending" &&
            "bg-gray-400 text-gray-500 cursor-not-allowed",
        )}
        onClick={() => {
          action.mutate(new FormData(ref.current!));
        }}
        disabled={action.status === "pending"}
      >
        Test calling action by invoking it rather than using form action
      </button>
    </>
  );
}
