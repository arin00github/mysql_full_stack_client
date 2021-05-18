import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

export interface IAsideProps {
  handleLogout: any;
}

export default function Aside({ handleLogout }: IAsideProps) {
  return (
    <div id="aside">
      <div className="profile">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <ul className="nav">
        <li>
          <Link href="/">
            <a href="/">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/view/Page01">
            <a href="/view/Page01">Page01</a>
          </Link>
        </li>
        <li>
          <Link href="/view/Page02">
            <a href="/view/Page02">Page02</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
