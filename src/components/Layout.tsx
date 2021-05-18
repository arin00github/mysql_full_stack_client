import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectKeycloak } from "../../redux/feature/auth";
import Aside from "./Aside";
import Main from "./Main";
import { selectAuth } from "../../redux/feature/auth/index";

export interface ILayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  const logoutUrl = {
    realms: "arin-world",
  };

  const getKeycloak = useSelector(selectAuth);
  //console.log(getKeycloak);

  return (
    <div id="wrap">
      <Aside handleLogout={() => getKeycloak.keycloak.logout()} />
      <Main>{children}</Main>
    </div>
  );
}
