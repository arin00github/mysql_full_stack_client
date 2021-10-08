import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { keycloak } from '../../pages/api/common/setting_keyclock';
import { KeycloakInstance } from 'keycloak-js';

import { AuthloginAction, KeycloakAction } from '../../redux/actions/auth-action';

import { AuthTokenAction } from '../../redux/actions/auth-action';
import { fetchUser } from '../../redux/slices/users-slice';

export interface KeycloakProps {
  children: ReactNode;
}

export const Keycloak = typeof window !== 'undefined' ? require('keycloak-js') : null;

function KeycloakComponent({ children }: KeycloakProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [keyinfo, setKeyInfo] = useState({
    keystate: null,
    authenticated: false,
  });

  const KeyclockInstance = keycloak;

  const initiateKeycloak = () => {
    console.log('keycloak', keycloak);
    if (Keycloak !== null) {
      KeyclockInstance.init({ onLoad: 'login-required' })
        .then((authenticated) => {
          //console.log(authenticated);
          setKeyInfo({
            ...keyinfo,
            keystate: KeyclockInstance,
            authenticated: authenticated,
          });
          KeyclockInstance.login;
          //console.log(KeyclockInstance);
          dispatch(KeycloakAction(KeyclockInstance)); // keycloak 인스턴스  redux 저장
          dispatch(AuthloginAction(true)); //isLogined true
          dispatch(AuthTokenAction(KeyclockInstance.token));
          const targetName = KeyclockInstance.tokenParsed.preferred_username;
          console.log('targetName', targetName);
          dispatch(fetchUser(targetName));
        })
        .catch((err) => {
          console.log(err);
          router.push({ pathname: '/404', query: { message: err } });
        });
      //const findname = KeyclockInstance.tokenParsed.preferred_username;

      //dispatch(getUserLogin(findname));
    } else {
    }
  };

  useEffect(() => {
    initiateKeycloak();
  }, []);
  console.log('keyinfo.keystate', keyinfo.keystate);

  if (keyinfo.keystate) {
    if (keyinfo.authenticated) {
      return <div>{children}</div>;
    } else return <div>Unable to authenticated!!</div>;
  }

  return <div>Initialize Keyclock</div>;
}

export default KeycloakComponent;
