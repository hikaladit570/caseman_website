import type { AnchorHTMLAttributes } from "react";

export default function PlainLink(
  props: AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return <a {...props} />;
}