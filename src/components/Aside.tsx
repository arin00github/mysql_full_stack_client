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
    { url: "/database/example01", title: "mssql", id: "menu001" },
    { url: "/database/example02", title: "mssql2", id: "menu002" },
  ];
  const D3_Sample = [
    { url: "/d3/map", title: "map", id: "menu0009" },
    { url: "/d3/zoom", title: "zoom", id: "menu0010" },
  ];

  const chart = [
    { url: "/weather/barChart01", title: "barChart01", id: "menu0012" },
    { url: "/weather/barChart02", title: "barChart02", id: "menu0013" },
    { url: "/weather/barChart03", title: "barChart03", id: "menu0014" },
    { url: "/weather/LineChart01", title: "LineChart01", id: "menu0015" },
    { url: "/weather/LineChart02", title: "LineChart02", id: "menu0016" },
    { url: "/weather/pieChart01", title: "pieChart01", id: "menu0017" },
    { url: "/weather/donutChart01", title: "donutChart01", id: "menu0018" },
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
        <li className="subject">MSSQL DATABASE</li>
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
