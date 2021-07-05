import React, { useEffect } from "react";
import Header from "../../src/components/layout/header";
export default function Chart03() {
  const margin = { top: 10, right: 30, bottom: 20, left: 50 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const drawChart = () => {};

  const getDataAPI = async () => {};

  useEffect(() => {}, []);

  return (
    <div>
      <Header title="D3 BARCHART" />
      <div className="d-flex">
        <div className="chart-set"></div>
      </div>
    </div>
  );
}
