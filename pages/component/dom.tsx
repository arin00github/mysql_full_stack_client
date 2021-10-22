import { useEffect } from 'react';
import Header from '../../src/components/layout/header';

export default function DocumentPage() {
  useEffect(() => {
    const boxItem = document.getElementById('box');
    console.log('boxItem.offsetHeight', boxItem.offsetHeight);
    console.log('boxItem.offsetWidth', boxItem.offsetWidth);
    console.log('boxItem.offsetTop', boxItem.offsetTop);
    console.log('boxItem.offsetLeft', boxItem.offsetLeft);

    console.log('boxItem.clientHeight', boxItem.clientHeight);
    console.log('boxItem.clientWidth', boxItem.clientWidth);

    console.log('boxItem.scrollHeight', boxItem.scrollHeight);
    console.log('boxItem.scrollWidth', boxItem.scrollWidth);
  }, []);
  return (
    <div>
      <Header title="height and width" />
      <div
        id="boxwrap"
        style={{ margin: '0 auto', width: '600px', height: '500px', overflow: 'scroll' }}
      >
        <div id="box" style={{ height: '2300px', width: '800px' }}></div>
      </div>
    </div>
  );
}
