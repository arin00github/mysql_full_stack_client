import { ReactNode } from "react";

export interface IMainProps {
  children: ReactNode;
}

export default function Main({ children }) {
  return (
    <div id="main">
      <div className="container-fluid">{children}</div>
    </div>
  );
}
