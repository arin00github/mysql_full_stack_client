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
          <Link href="/view/add-users">
            <a href="/view/add-users">add-users</a>
          </Link>
        </li>
        <li>
          <Link href="/view/add-bootcamp">
            <a href="/view/add-bootcamp">add-bootcamp</a>
          </Link>
        </li>
        <li>
          <Link href="/view/add-review">
            <a href="/view/add-review">add-review</a>
          </Link>
        </li>
        <li>
          <Link href="/view/readData">
            <a href="/view/readData">readData</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
