import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return <main className="ml-72 p-10 max-w-400 mx-auto">{children}</main>;
}