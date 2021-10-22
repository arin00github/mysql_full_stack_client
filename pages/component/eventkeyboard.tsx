import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Header from '../../src/components/layout/header';

function useKey(key, cb) {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  function handle(event) {
    if (event.code === key) {
      console.log('event.code', event.code);
      callbackRef.current(event);
    }
  }
  useEffect(() => {
    document.addEventListener('keypress', handle);
    return () => document.removeEventListener('keypress', handle);
  });
}

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  function upHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export default function EventKeyboardPage() {
  function handleEnter() {
    console.log('Enter key is pressed');
  }
  function handleArrowUp() {
    console.log('ArrowRight is pressed');
  }

  function handleKey() {
    console.log('KeyA is pressed');
  }

  function handleKey2() {
    console.log('Digit4 is pressed');
  }

  useKey('Enter', handleEnter);
  useKey('KeyA', handleKey);
  useKey('ArrowRight', handleArrowUp);
  useKey('Digit4', handleKey2);

  //const happyPress = useKeyPress('ArrowUp');
  const sadPress = useKeyPress('s');
  const robotPress = useKeyPress('r');
  const foxPress = useKeyPress('f');

  const [cursor, setCursor] = useState(0);
  const [list, setList] = useState([
    { title: 'menu1', id: 'menu1' },
    { title: 'menu2', id: 'menu2' },
    { title: 'menu3', id: 'menu3' },
    { title: 'menu4', id: 'menu4' },
    { title: 'menu5', id: 'menu5' },
  ]);

  function handleKeyDown(e) {
    if (e.code === 'ArrowUp' && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.code === 'ArrowDown' && cursor < list.length - 1) {
      setCursor(cursor + 1);
    }
  }
  console.log('cursor', cursor);

  return (
    <div id="eventkeyboad-page">
      <Header title="Event Keyboard" />
      <div>
        {/* {happyPress && '😊'} */}
        {sadPress && '😢'}
        {robotPress && '🤖'}
        {foxPress && '🦊'}
      </div>
      <div>
        <Form.Group>
          <Form.Control onKeyDown={handleKeyDown} />
        </Form.Group>
        <ul>
          {list.map((item, i) => (
            <li key={item.id} className={cursor === i ? 'active' : null}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
