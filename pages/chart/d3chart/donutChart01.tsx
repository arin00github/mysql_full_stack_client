import * as d3 from "d3";
import React from "react";
import Header from "../../../src/components/layout/header";
import { useEffect } from "react";
import DonutChartBasic from "../../../src/components/chart/donutChart-basic";
import { useSelector } from "react-redux";
import { ICurrentData } from "../../../src/interface/chart-interface";
import { useState } from "react";

export default function DonutChartPage() {
  const [deviceModel, setDiviceModel] = useState({});
  const driverArray = ["drv_samsung", "drv_commonrtsp"];

  const reduxData = useSelector(
    (state: { chart: ICurrentData }) => state.chart
  );

  //model_driver 갯수 찾아주는 역할
  const dataRemake = (array) => {
    let empty = {};
    driverArray.forEach((name) => {
      const result = array.filter((it) => {
        return it.model_driver === name;
      });

      // Object.defineProperty(empty, name, {
      //   value: result.lenght,
      // });
      //console.log("result", result);
      empty[name] = result.length;
    });
    setDiviceModel(empty);
  };
  console.log("deviceModel", deviceModel);

  useEffect(() => {
    if (reduxData.current !== null) {
      console.log("01. dataRemake");
      dataRemake(reduxData.current);
    }
  }, [reduxData.current]);
  return (
    <div>
      <Header title="D3 BARCHART" />
      <div className="d-flex">
        <div className="chart-set">
          <DonutChartBasic
            name="donut-chart01"
            size={{ width: 600, height: 450, margin: 40 }}
            data={{ a: 5, b: 35, c: 12, d: 11, e: 8 }}
            color={["#26c1f0", "#61a6d4", "#083263", "#3d65e9", "#0853a8"]}
          />
        </div>
      </div>
      <div className="chart-set">
        {reduxData.current !== null && (
          <DonutChartBasic
            name="donut-chart02"
            size={{ width: 600, height: 450, margin: 40 }}
            data={deviceModel}
            color={["#26c1f0", "#0853a8"]}
          />
        )}
      </div>
    </div>
  );
}
