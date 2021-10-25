import styled, { css } from 'styled-components';
import { useTodoDispatch } from './todoContext';
//import { MdDone, MdDelete } from 'react-icons/md';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

type ICheck = {
  done: boolean;
};

const Text = styled.div<ICheck>`
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `};
  flex: 1;
  font-size: 21px;
  color: #495057;
`;

const CheckCircle = styled.div<ICheck>`
  ${({ done }) =>
    done &&
    css`
      border-width: 1px;
      border-style: solid;
      border-color: #38d9a9;
      color: #38d9a9;
    `};
  border-radius: 16px;
  border-width: 1px;
  border-style: solid;
  border-color: #ced4da;
  width: 32px;
  height: 32px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

type ITodoItem = {
  id?: string;
  done: boolean;
  text: string;
};

function TodoItem({ id, done, text }: ITodoItem) {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && (
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'green' }} />
        )}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', color: 'grey' }}>X</span>
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
