"use client";

import { twMerge } from "tailwind-merge";
import { experimental_useFormStatus } from "react-dom";

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

  return (
    <button
      {...props}
      {...(formStatus.pending && props.pendingProps)}
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
      action: (fn: FormData) => unknown;
      method?: "POST";
    }
  >,
) {
  return (
    <form {...props} action={props.action} method='POST'>
      {props.children}
    </form>
  );
}
