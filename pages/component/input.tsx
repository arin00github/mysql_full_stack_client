import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Header from '../../src/components/layout/header';

export default function InputPage() {
  const [inputItem, setInputItem] = useState({
    word: '',
  });

  const targetInput = useRef(null);

  const [result, setResult] = useState([]);

  const addList = () => {
    setResult([...result, inputItem.word]);
  };

  const handleChange = (e) => {
    setInputItem({
      ...inputItem,
      word: e.target.value,
    });
  };
  const handlePress = (e) => {
    // e.preventDefault();
    if (e.key === 'Enter') {
      addList();
      setInputItem({
        ...inputItem,
        word: '',
      });
      targetInput.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e);
  };

  return (
    <div>
      <Header title="input" />
      <div>
        <h4 className="mb-3">검색기능 (Enter)</h4>
        <form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              value={inputItem.word}
              onChange={handleChange}
              onKeyPress={handlePress}
              ref={targetInput}
            />
          </Form.Group>
        </form>
      </div>

      <div className="d-flex" style={{ margin: '10px 0' }}>
        {result.length !== 0 &&
          result.map((it) => {
            return (
              <div key={it} style={{ padding: '8px', marginRight: '4px' }}>
                {it}
              </div>
            );
          })}
      </div>
    </div>
  );
}
