import React from "react";

type HelloProps = {
  /** 보여주고 싶은 이름 */
  name: string;
  /** 이 값을 `true` 로 설정하면 h1 태그로 렌더링합니다. */
  big?: boolean;
  /** Hello 버튼 누를 때 호출 할 함수 */
  onHello?: () => void;
  /** Bye 버튼 누를 때 호출 할 함수 */
  onBye?: () => void;
};

/**
 * 안녕하세요 라고 보여주고 싶을 땐 `Hello` 컴포넌트를 사용하세요.
 * - `big` 값을 `true`로 설정하면 **크게** 나타납니다.
 * - `onHello` 와 `onBye` props로 설정
 */

const Hello = ({ name, big, onBye, onHello }: HelloProps) => {
  return (
    <div>
      {big ? <h1>안녕하세요, {name}!</h1> : <h4>안녕하세요!</h4>}
      <div>
        <button onClick={onHello}>Hello</button>
        <button onClick={onBye}>Bye</button>
      </div>
    </div>
  );
};

Hello.defaultProps = {
  name: "Jack",
  big: false,
};

export default Hello;
