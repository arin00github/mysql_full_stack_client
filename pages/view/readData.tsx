import { useDispatch, useSelector } from "react-redux";
import wrapper, { RootState } from "../../redux/store3";

import { useEffect } from "react";
import { CommonService } from "../api/services/common-service";
import { IAuthInfo } from "../../src/interface/auth-interface";

export default function ReadData() {
  const tokenState = useSelector<RootState, IAuthInfo>(
    (state) => state.auth.token
  );
  console.log(tokenState);

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
