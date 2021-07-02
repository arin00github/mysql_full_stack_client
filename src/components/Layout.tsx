import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Aside from "./Aside";
import Main from "./Main";
import { selectAuth } from "../../redux/feature/auth/index";

import users from "../../redux/slices/users-slice";
import { RootState } from "../../redux/store3";
import { AuthlogoutAction } from "../../redux/actions/auth-action";

export interface ILayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  const dispatch = useDispatch();

  const getKeycloak = useSelector<RootState, any>((state) => state.users);
  //console.log(getKeycloak);

  const handleLogout = () => {
    dispatch(AuthlogoutAction);
    getKeycloak.keycloak.logout();
  };

  return (
    <div id="wrap">
      <Aside handleLogout={() => handleLogout()} />
      <Main>{children}</Main>
    </div>
  );
}
