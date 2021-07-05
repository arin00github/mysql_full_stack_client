import axios from "axios";
import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import BarChartFlex from "../../src/components/chart/barchart_flex";
import BarChart from "../../src/components/chart/barchart_solid";
import Header from "../../src/components/layout/header";

export interface IWeatherProps {
  dt_txt: string;
  dt: number;
  temp: number;
  wind_speed?: number;
  cloud_num?: number;
  pop?: number;
}

export default function Chart02() {
  const WEATHER_API = process.env.OPENWEATHER_API_KEY;
  const dataUrl =
    "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv";
  const [barData, setBarData] = useState({
    data: [],
  });

  const [weatherData2, setWeatherData2] = useState({
    data: undefined,
  });
  const [weatherData, setWeatherData] = useState({
    data: undefined,
  });
  const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&appid=8a722b85aca0471e5952cdf47161f37f`;

  const getDataAPI = async () => {
    axios
      .get(weatherAPI)
      .then((res) => {
        //console.log("weather", res.data.list);
        const dataArray = res.data.list;

        const resultArray = dataArray.slice(0, 8).map((item) => {
          return {
            key: item.dt_txt.substr(11, 2),
            value: item.main.temp,
          };
        });
        setWeatherData({
          ...weatherData,
          data: resultArray,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDataAPI2 = async () => {
    axios
      .get(weatherAPI)
      .then((res) => {
        console.log("weather", res.data.list);
        const dataArray = res.data.list;
        const resultArray2 = dataArray.slice(0, 10).map((item) => {
          return {
            key: item.dt_txt.substr(11, 2),
            value: item.main.humidity,
          };
        });
        setWeatherData2({
          ...weatherData2,
          data: resultArray2,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dataAPI = () => {
    d3.csv(dataUrl).then((res) => {
      //console.log(res);
      setBarData({
        ...barData,
        data: res,
      });
    });
  };

  const changeColor = (color) => {
    d3.selectAll("rect").transition().duration(1000).style("fill", color);
  };

  useEffect(() => {
    getDataAPI2();
  }, []);
  useEffect(() => {
    getDataAPI();
    dataAPI();
    //console.log("download");
  }, []);

  return (
    <div>
      <Header title="D3 BARCHART" />

      <div className="d-flex">
        <div className="chart-set">
          <div className="btn-wrap">
            <button
              onClick={() => {
                changeColor("blue");
              }}
            >
              blue
            </button>
            <button
              onClick={() => {
                changeColor("green");
              }}
            >
              green
            </button>
          </div>
          {weatherData.data !== undefined && (
            <BarChart
              div={{ divWidth: 460, divHeight: 460 }}
              data={weatherData.data}
              margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
              maxYvalue={35}
              name="chart01"
              domain={weatherData.data.map((item) => {
                return item.dt_txt;
              })}
              barLabel={false}
            />
          )}
        </div>
        <div className="chart-set">
          {/* {weatherData2.data !== undefined && (
            <BarChart
              div={{ divWidth: 460, divHeight: 460 }}
              data={weatherData2.data}
              margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
              maxYvalue={100}
              name="chart02"
              domain={weatherData2.data.map((item) => {
                return item.dt_txt;
              })}
              barLabel={true}
            />
          )} */}
        </div>
      </div>
      <div className="d-flex">
        <div
          className="chart-set"
          style={{ flexBasis: "calc((100% -30px)/2)" }}
        >
          {weatherData2.data !== undefined && (
            <BarChartFlex
              div={{ divWidth: 460, divHeight: 460 }}
              data={weatherData2.data}
              margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
              maxYvalue={100}
              name="chart02"
              domain={weatherData2.data.map((item) => {
                return item.dt_txt;
              })}
              barLabel={true}
            />
          )}
        </div>
        <div
          className="chart-set"
          style={{ flexBasis: "calc((100% -30px)/2)" }}
        ></div>
      </div>
    </div>
  );
}
