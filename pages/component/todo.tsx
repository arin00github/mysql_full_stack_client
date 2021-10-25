import React, { useEffect } from 'react';
import Header from '../../src/components/layout/header';
import { TodoProvider } from '../../src/components/todo/todoContext';
import TodoHead from '../../src/components/todo/todoHead';
import TodoList from '../../src/components/todo/todoList';
import TodoTemplate from '../../src/components/todo/todoTemplate';
import TodoCreate from '../../src/components/todo/todoCreate';

export default function DocumentPage() {
  useEffect(() => {}, []);
  return (
    <div>
      <Header title="Todo Component" />
      <div>
        <TodoProvider>
          {/* <GlobalStyle /> */}
          <TodoTemplate>
            <TodoHead />
            <TodoList />
            <TodoCreate />
          </TodoTemplate>
        </TodoProvider>
      </div>
    </div>
  );
}
