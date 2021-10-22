import React, { HTMLAttributes, ReactNode } from 'react';
import { jsx, css } from '@emotion/core';

//import './button.css';

// export interface ButtonProps {
//   /**
//    *  Provide a text for the button
//    */
//   children: ReactNode;
//   /**
//    * Which variant look would you like use
//    */
//   variant?: 'primary' | 'secondary';
//   /**
//    * 3 kind of size
//    */
//   size?: 'small' | 'medium' | 'large';
//   /**
//    * Mouse Click Event
//    */
//   onClick?: () => void;
//   //backgroundColor: string;
// }

// export const Button = ({ children, variant, onClick, size = 'medium', ...props }: ButtonProps) => {
//   return (
//     <button
//       {...props}
//       style={
//         {
//           //backgroundColor: backgroundColor,
//           // color: 'white',
//           // border: 'none',
//           // borderRadius: 10,
//           // padding: 10,
//           // cursor: 'pointer',
//         }
//       }
//       className={`storybook-button storybook-button--${variant} storybook-button--${size}`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

type ButtonProps = {
  /** 버튼 안의 내용 */
  children: React.ReactNode;
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다.  */
const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button css={style} onClick={onClick}>
      {children}
    </button>
  );
};

const style = css`
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: #20c997;
  color: white;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    background: #38d9a9;
  }
  &:active {
    background: #12b886;
  }
`;

export default Button;
