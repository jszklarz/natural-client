import clsx from "clsx";
import { HTMLProps } from "react";

export const CenteredLayout = (props: HTMLProps<HTMLDivElement>) => {
  const { children, className } = props;

  return <div className={clsx("relative flex items-center justify-center min-h-screen overflow-hidden", className)}>
    {children}
  </div>
}
