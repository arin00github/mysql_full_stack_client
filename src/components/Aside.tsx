import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";

export interface IAsideProps {
  handleLogout: any;
}

export default function Aside({ handleLogout }: IAsideProps) {
  const Mysql = [
    { url: "/view/add-users", title: "Add-Users", id: "menu0002" },
    { url: "/view/add-bootcamp", title: "Add-bootcamp", id: "menu0003" },
    { url: "/view/add-review", title: "Add-review", id: "menu0004" },
  ];

  const React_Simple_Map = [
    { url: "/map/section01", title: "section01", id: "menu0005" },
    { url: "/map/section02", title: "section02", id: "menu0006" },
    { url: "/map/section03", title: "section03", id: "menu0007" },
  ];

  const D3_Sample = [
    { url: "/d3/basic", title: "basic", id: "menu0008" },
    { url: "/d3/sample01", title: "sample01", id: "menu0009" },
    { url: "/d3/sample02", title: "sample02", id: "menu0010" },
  ];

  return (
    <div id="aside">
      <div className="profile">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <ul className="nav">
        <li className="subject">
          <Link href="/">
            <a href="/">HOME</a>
          </Link>
        </li>
        <li className="subject">MYSQL DATABASE</li>
        {Mysql.map((menu) => {
          return (
            <li key={menu.id}>
              <Link href={menu.url}>
                <a href={menu.url}>{menu.title}</a>
              </Link>
            </li>
          );
        })}
        <li className="subject">REACT SIMPLE MAP</li>
        {React_Simple_Map.map((menu) => {
          return (
            <li key={menu.id}>
              <Link href={menu.url}>
                <a href={menu.url}>{menu.title}</a>
              </Link>
            </li>
          );
        })}
        <li className="subject">D3</li>
        {D3_Sample.map((menu) => {
          return (
            <li key={menu.id}>
              <Link href={menu.url}>
                <a href={menu.url}>{menu.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
