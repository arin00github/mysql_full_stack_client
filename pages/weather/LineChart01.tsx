import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import Header from "../../src/components/layout/header";

interface IlineChartProps {
  date: Date;
  value: number;
}

export default function LineChart01() {
  const url =
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv";

  const [lineData, setLineData] = useState({
    data: undefined,
  });

  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#line-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

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
  console.log("lineData", lineData.data);

  const drawLineChart = async () => {
    const domainValue = d3.extent(
      lineData.data.map((it) => {
        return new Date(it.date);
      })
    );
    console.log("domainValue", domainValue);
    const x = d3.scaleTime().domain(domainValue).range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear().domain([8000, 9000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(lineData.data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => {
            return x(new Date(d.date));
          })
          .y((d) => y(d.value))
      );

    svg
      .append("g")
      .selectAll("dot")
      .data(lineData.data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(new Date(d.date)))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("fill", "#69b3a2");
  };
  useEffect(() => {
    if (lineData.data !== undefined) {
      drawLineChart();
    }
  }, [lineData.data]);

  useEffect(() => {
    getDataAPI();
  }, []);

  return (
    <div>
      <Header title="D3 LINECHART" />
      <div className="d-flex">
        <div className="chart-set">
          <div id="line-chart"></div>
        </div>
      </div>
    </div>
  );
}
