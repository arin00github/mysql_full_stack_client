import { Router, useRouter } from "next/router";
import { selectAuth } from "../../redux/feature/auth/index";
import { useDispatch, useSelector } from "react-redux";
import wrapper, { RootState } from "../../redux/store";

import { NextPage } from "next";
import { addCount, selectCount } from "../../redux/feature/count/index";
import { IUserProfile } from "../../src/interface/user-interface";
import { getUserAction } from "../../redux/actions/users-action";
import { useEffect } from "react";
import { CommonService } from "../api/services/common-service";
import { IAuthInfo } from "../../src/interface/auth-interface";

export default function ReadData() {
  const tokenState = useSelector<RootState, IAuthInfo>(
    (state) => state.auth.token
  );
  console.log(tokenState);

  const router = useRouter();

  const getUserListAPI = async () => {
    const rlst = await CommonService.instance.getUserList();
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <h1>ReadData</h1>
    </div>
  );
}

/**
 *  wrapper.getServersideRender 등이 있다면  페이지를 이동 할 시에 리덕스에서
 * _NEXT_REDUX_WRAPPER이 실행되어 전체를 스토어로 덮어버린다.(초기화되어 버린다.)
 *
 */
