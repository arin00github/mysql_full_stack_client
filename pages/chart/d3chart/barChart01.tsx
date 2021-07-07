import axios from "axios";
import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import Header from "../../../src/components/layout/header";

export default function Chart01() {
  const [multiData, setMultiData] = useState({
    data: undefined,
  });
  let subgroups: any[] | Iterable<string>, groups: Iterable<string>;

  const url =
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv";

  const margin = { top: 10, right: 30, bottom: 20, left: 50 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart-multi")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const getDataAPI = async () => {
    d3.csv(url).then((data) => {
      setMultiData({
        ...multiData,
        data: data,
      });
    });
  };
  console.log("multiData", multiData.data);

  const drawChart = async () => {
    subgroups = multiData.data.columns.slice(1);
    console.log("subgroups", subgroups);

    groups = multiData.data.map((d: { group: any }) => d.group);
    const x = d3.scaleBand().domain(groups).range([0, width]).padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0));

    const y = d3.scaleLinear().domain([0, 40]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding(0.05);

    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#e41a1c", "#377eb8", "#4daf4a"]);

    svg
      .append("g")
      .selectAll("g")
      .data(multiData.data)
      .join("g")
      .attr("transform", (d) => `translate(${x(d.group)}, 0)`)
      .selectAll("rect")
      .data(function (d) {
        return subgroups.map((key: string | number) => {
          return { key: key, value: d[key] };
        });
      })
      .join("rect")
      .attr("x", (d) => xSubgroup(d.key))
      .attr("y", (d) => y(d.value))
      .attr("width", xSubgroup.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", (d) => color(d.key));
  };

  useEffect(() => {
    if (multiData.data !== undefined) {
      drawChart();
    }
  }, [multiData.data]);

  useEffect(() => {
    getDataAPI();
  }, []);

  return (
    <div>
      <Header title="D3 BARCHART" />
      <div id="chart-multi"></div>
      <div id="chart2"></div>
      <div id="chart3"></div>
      <div id="chart4"></div>
    </div>
  );
}
