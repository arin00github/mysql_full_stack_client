import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Header from '../../src/components/layout/header';
import AutoComplete from '../../src/components/AutoComplete/index';
import CountriesList from '../../src/resource/coutries.json';

export default function EventKeyboardPage() {
  const [selectedData, setSelectedData] = useState({});

  return (
    <div id="keyboad-page">
      <Header title="Event Keyboard" />
      <div className="container">
        <div className="row">
          <div className="col">
            <div>
              <div className="list-wrap">
                <AutoComplete data={CountriesList} onSelect={(value) => setSelectedData(value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
