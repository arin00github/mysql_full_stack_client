import { ReactNode } from 'react';

export interface IMainProps {
  children: ReactNode;
}

export default function Main({ children }: IMainProps) {
  return (
    <div id="main">
      <div style={{ padding: '0 40px' }}>{children}</div>
    </div>
  );
}
