import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import users from "../../redux/slices/users-slice";
import { RootState, State } from "../../redux/slices/index";

export interface IAsideProps {
  handleLogout: any;
}

export default function Aside({ handleLogout }: IAsideProps) {
  const Mysql = [
    { url: "/view/add-users", title: "Add-Users", id: "menu0002" },
    { url: "/view/add-bootcamp", title: "Add-bootcamp", id: "menu0003" },
    { url: "/view/my-page", title: "My-Page", id: "menu0004" },
  ];

  const database = [
    { url: "/database/study01", title: "study01", id: "menu0005" },
    { url: "/database/study02", title: "study02", id: "menu0006" },
    { url: "/database/study03", title: "study03", id: "menu0007" },
  ];

  const D3_Sample = [
    { url: "/d3/basic", title: "basic", id: "menu0008" },
    { url: "/d3/map", title: "map", id: "menu0009" },
  ];

  const user = useSelector((state: State) => state.users);

  return (
    <div id="aside">
      <div className="profile">
        <h3 className="mb-4 mt-4">{user.userInfo.name}</h3>
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
        <li className="subject">DATABASE</li>
        {database.map((menu) => {
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
