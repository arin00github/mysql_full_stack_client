import { ReactNode } from 'react';
//import './center.css';

interface CenterProps {
  children: ReactNode;
}

export default function Center({ children }: CenterProps) {
  return <div className="center">{children}</div>;
}
