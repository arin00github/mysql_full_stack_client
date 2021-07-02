import axios from "axios";
import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import BarChart from "../../src/components/chart/barchart";
import Header from "../../src/components/layout/header";

export default function Chart02() {
  const dataUrl =
    "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv";
  const [barData, setBarData] = useState({
    data: undefined,
  });
  const [groupData, setGroupData] = useState({
    data: undefined,
  });
  const weatherAPI =
    "https://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&appid=8a722b85aca0471e5952cdf47161f37f";
  const getDataAPI = async () => {
    axios
      .get(weatherAPI)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  const dataAPI = () => {
    d3.csv(dataUrl).then((res) => {
      console.log("weather", res);
      setBarData({
        ...barData,
        data: res,
      });
    });
  };

  const changeColor = (color) => {
    d3.selectAll("rect").transition().duration(1000).style("fill", color);
  };

  /*********************   data change chart  ******************************/

  const dataGroup1 = [
    { Country: "A", Value: 12 },
    { Country: "B", Value: 19 },
    { Country: "C", Value: 7 },
  ];
  const dataGroup2 = [
    { group: "A", value: 6 },
    { group: "B", value: 10 },
    { group: "C", value: 14 },
  ];

  const changeData = (data) => {
    //svg2.selectAll().data(data);
  };

  useEffect(() => {
    getDataAPI();
    dataAPI();
    //console.log("download");
  }, []);

  return (
    <div>
      <Header title="D3 CHART" />

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
          <BarChart
            div={{ divWidth: 460, divHeight: 460 }}
            data={barData.data}
            margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
            maxYvalue={13000}
            name="chart01"
          />
        </div>
        <div className="chart-set">
          <div className="btn-wrap">
            <button
              onClick={() => {
                changeData(dataGroup1);
              }}
            >
              Data1
            </button>
            <button
              onClick={() => {
                changeData(dataGroup2);
              }}
            >
              Data2
            </button>
          </div>
          <BarChart
            div={{ divWidth: 460, divHeight: 460 }}
            data={dataGroup1}
            margin={{ top: 30, right: 30, bottom: 70, left: 60 }}
            maxYvalue={20}
            name="chart02"
          />
        </div>
      </div>
    </div>
  );
}
