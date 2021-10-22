import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import AutoCompleteItem from './AutoCompleteItem';

interface IAutoComplete {
  data: any;
  onSelect: any;
}

export default function AutoComplete({ data, onSelect }: IAutoComplete) {
  const [isVisible, setVisibility] = useState(false);
  const [search, setSearch] = useState('');
  const [cursor, setCursor] = useState(-1);

  const searchContainer = useRef(null);
  const searchResultRef = useRef(null);
  const inputRef = useRef(null);

  const showSuggestion = () => setVisibility(true);
  const hideSuggestion = () => setVisibility(false);

  //밖으로 클릭하면 리스트 사라짐
  const handleClickOutside = (event) => {
    if (searchContainer.current && !searchContainer.current.contains(event.target)) {
      hideSuggestion();
    }
  };

  //스크롤 높이 조절
  const scrollIntoView = (position) => {
    searchResultRef.current.parentNode.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  };

  //검색필터
  const suggestion = useMemo(() => {
    if (!search) return data;
    setCursor(-1);
    scrollIntoView(0);
    return data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  //키보드 방향 조작
  const keyboardNavigation = (e) => {
    if (e.code === 'ArrowDown') {
      isVisible ? setCursor((c) => (c < suggestion.length - 1 ? c + 1 : c)) : showSuggestion();
    }
    if (e.code === 'ArrowUp') {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.code === 'Escape') {
      hideSuggestion();
    }
    if (e.code === 'Enter' && cursor > 0) {
      setSearch(suggestion[cursor].name);
      hideSuggestion();
    }
  };

  //스크롤 높이 반영하여 rerendering
  useEffect(() => {
    if (cursor < 0 || cursor > suggestion.length || !searchResultRef) {
      return () => {};
    }
    const listItems = Array.from(searchResultRef.current.children);
    listItems[cursor] && scrollIntoView(57 * cursor);
  }, [cursor]);

  //바깥 클릭 시 사라짐을 rerendering
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const doc = document.documentElement;
    const pageH = doc.scrollHeight;
    const pageW = doc.scrollWidth;
    console.log(pageH, pageW);
    const box = searchResultRef.current.parentNode;
    const top = inputRef.current.offsetTop;
    const left = inputRef.current.offsetLeft;
    box.style.top = `${top}px`;
    box.style.left = `${left}px`;
  }, []);

  return (
    <div className="autocomplete" ref={searchContainer}>
      <Form.Control
        style={{ marginTop: '140px' }}
        ref={inputRef}
        type="text"
        name="search"
        className="search-bar"
        autoComplete="off"
        value={search}
        onClick={showSuggestion}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => keyboardNavigation(e)}
      />
      <div className={`search-result ${isVisible ? 'visible' : 'invisible'}`}>
        <ul className="list-group" ref={searchResultRef}>
          {suggestion.map((item, idx) => {
            //console.log('compare', cursor === idx);
            return (
              <AutoCompleteItem
                {...item}
                key={item.name}
                onSelectItem={() => {
                  hideSuggestion();
                  setSearch(item.name);
                  onSelect(item);
                }}
                isHighlighted={cursor === idx ? true : false}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
