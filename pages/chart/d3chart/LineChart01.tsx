import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import LineChart01 from "../../../src/components/chart/linechart_solid";
import Header from "../../../src/components/layout/header";

interface IlineChartProps {
  date: Date;
  value: number;
}

export default function LineChartPage() {
  const url =
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv";

  const [lineData, setLineData] = useState({
    data: undefined,
  });

  const getDataAPI = async () => {
    d3.csv(url).then((res) => {
      let newArray = res.slice(0, 8).map((it) => {
        console.log(it.date);
        return { date: it.date, value: parseInt(it.value) };
      });
      setLineData({
        ...lineData,
        data: newArray,
      });
    });
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  return (
    <div>
      <Header title="D3 LINECHART" />
      <div className="d-flex">
        <div className="chart-set">
          <div id="line-chart">
            <LineChart01
              data={lineData.data}
              margin={{ top: 10, right: 30, bottom: 30, left: 60 }}
              name="line-chart01"
              tooltipShow={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
