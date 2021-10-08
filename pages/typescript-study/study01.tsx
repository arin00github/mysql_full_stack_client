import React, { ReactNode } from 'react';

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const TodoData: Todo[] = [
  { id: 1, done: false, text: 'study nodejs' },
  { id: 2, done: false, text: 'buy fruit' },
];

function CreateGeneric<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              itemClick(item);
            }}
          >
            {render(item)}
          </li>
        );
      })}
    </ul>
  );
}
function writeConsole(param) {
  console.log(param);
}

function Study01() {
  return (
    <div>
      <CreateGeneric
        items={TodoData}
        itemClick={(item) => alert(item.text)}
        render={(todo) => (
          <>
            {todo.text}
            <button
              onClick={() => {
                writeConsole(todo.text);
              }}
            >
              remove
            </button>
          </>
        )}
      />
    </div>
  );
}

export default Study01;
