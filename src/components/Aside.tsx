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
    { url: "/database/example01", title: "mssql", id: "menu0015" },
  ];
  const D3_Sample = [
    { url: "/d3/map", title: "map", id: "menu0009" },
    { url: "/d3/zoom", title: "zoom", id: "menu0010" },
  ];

  const chart = [
    { url: "/weather/chart01", title: "chart01", id: "menu0012" },
    { url: "/weather/chart02", title: "chart02", id: "menu0013" },
    { url: "/weather/chart03", title: "chart04", id: "menu0014" },
    { url: "/weather/chart04", title: "chart05", id: "menu0015" },
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
        <li className="subject">D3</li>
        {chart.map((menu) => {
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
