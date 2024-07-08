import type { ChildrenProps } from "@/interfaces";
import Root from "@/layouts/Root";

export default function RootLayout({ children }: ChildrenProps) {
  return <Root>{children}</Root>;
}
