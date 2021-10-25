import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import users from '../../redux/slices/users-slice';
import { RootState, State } from '../../redux/slices/index';

export interface IAsideProps {
  handleLogout: any;
}

export default function Aside({ handleLogout }: IAsideProps) {
  const Mysql = [{ url: '/database/example01', title: 'mssql', id: 'menu001' }];
  const D3_Sample = [
    { url: '/d3/map', title: 'map', id: 'menu0009' },
    { url: '/d3/zoom', title: 'zoom', id: 'menu0010' },
    { url: '/typescript-study/study01', title: 'study01', id: 'menu0034' },
  ];

  const storybook = [
    { url: '/storybook/page01', title: 'page01', id: 'menu0045' },
    { url: '/storybook/page02', title: 'page02', id: 'menu0046' },
    { url: '/storybook/page03', title: 'page03', id: 'menu0047' },
  ];

  const chart = [
    { url: '/chart/d3chart/barChart01', title: 'barChart01', id: 'menu0012' },
    { url: '/chart/d3chart/barChart02', title: 'barChart02', id: 'menu0013' },
    { url: '/chart/d3chart/LineChart01', title: 'LineChart01', id: 'menu0015' },
    { url: '/chart/d3chart/LineChart02', title: 'LineChart02', id: 'menu0016' },
    { url: '/chart/d3chart/LineChart03', title: 'LineChart03', id: 'menu0090' },
    { url: '/chart/d3chart/pieChart01', title: 'pieChart01', id: 'menu0017' },
    {
      url: '/chart/d3chart/donutChart01',
      title: 'donutChart01',
      id: 'menu0018',
    },
  ];

  const echarts = [
    { url: '/chart/echart/page01', title: 'page01', id: 'menu0019' },
    { url: '/chart/echart/page02', title: 'page02', id: 'menu0020' },
    { url: '/chart/echart/page03', title: 'page03', id: 'menu0021' },
    { url: '/chart/echart/page04', title: 'page04', id: 'menu0022' },
    { url: '/chart/echart/page05', title: 'page05', id: 'menu0023' },
  ];

  const component = [
    { url: '/component/todo', title: 'todo', id: 'menu0034' },
    { url: '/component/input', title: 'input', id: 'menu0031' },
    { url: '/component/eventkeyboard', title: 'eventkeyboard', id: 'menu0032' },
    { url: '/component/keyboard', title: 'keyboard', id: 'menu0033' },
  ];

  const user = useSelector((state: State) => state.users);

  return (
    <div id="aside">
      <div className="profile">
        <h3 className="mb-4 mt-4">{user.userInfo.name}</h3>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <ul className="nav">
        <li className="subject">
          <Link href="/">
            <a href="/">HOME</a>
          </Link>
        </li>
        <li className="subject">MSSQL DATABASE</li>
        <div>
          {Mysql.map((menu) => {
            return (
              <li key={menu.id}>
                <Link href={menu.url}>
                  <a href={menu.url}>{menu.title}</a>
                </Link>
              </li>
            );
          })}
        </div>
        <li className="subject">STORYBOOK</li>
        <div>
          {storybook.map((menu) => {
            return (
              <li key={menu.id}>
                <Link href={menu.url}>
                  <a href={menu.url}>{menu.title}</a>
                </Link>
              </li>
            );
          })}
        </div>
        <li className="subject">COMPONENT</li>
        <div>
          {component.map((menu) => {
            return (
              <li key={menu.id}>
                <Link href={menu.url}>
                  <a href={menu.url}>{menu.title}</a>
                </Link>
              </li>
            );
          })}
        </div>

        <li className="subject">CHART(echarts)</li>
        <div>
          {echarts.map((menu) => {
            return (
              <li key={menu.id}>
                <Link href={menu.url}>
                  <a href={menu.url}>{menu.title}</a>
                </Link>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}
