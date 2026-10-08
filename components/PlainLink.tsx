import type { AnchorHTMLAttributes } from "react";

export default function PlainLink(
  { children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return <a {...props}>{children}</a>;
}
