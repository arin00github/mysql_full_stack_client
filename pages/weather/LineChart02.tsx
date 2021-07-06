import * as d3 from "d3";
import React, { useEffect, useState } from "react";

import Header from "../../src/components/layout/header";

export default function LineChart01() {
  const url =
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv";

  const [lineData, setLineData] = useState({
    data: undefined,
  });

  const margin = { top: 10, right: 100, bottom: 30, left: 30 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const allGroup = ["valueA", "valueB", "valueC"];

  const colorSet = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

  const svg = d3
    .select("#line-chart02")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const drawLineChart = () => {
    const dataReady = allGroup.map((grp) => {
      return {
        name: grp,
        values: lineData.data.map((d) => {
          //console.log("dataRead map", d);
          return { time: d.time, value: +d[grp] };
        }),
      };
    });
    console.log("lineData", lineData.data);
    console.log("dataReady", dataReady);

    // Add X axis --> it is a date format
    const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((d) => {
        return x(+d.time);
      })
      .y((d) => {
        return y(+d.value);
      });

    // 그래프를 <g>태그로 그룹화 시켜야 한다.
    const group = svg
      .selectAll(".group")
      .data(dataReady)
      .enter()
      .append("g")
      .attr("class", "group");

    group
      .append("path")
      .attr("class", "line")
      .attr("d", function (d) {
        console.log("path d", d);
        return line(d.values);
      })
      .attr("stroke", (d) => {
        return colorSet(d.name);
      })
      .style("stroke-width", 4)
      .style("fill", "none");

    group
      .append("g")
      .style("fill", (d) => {
        return colorSet(d.name);
      })
      .selectAll("circle")
      .data((d) => {
        return d.values;
      })
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        return x(d.time);
      })
      .attr("cy", (d) => {
        return y(d.value);
      })
      .attr("r", 5)
      .attr("stroke", "white");

    group
      .append("text")
      .datum((d) => {
        return { name: d.name, value: d.values[d.values.length - 1] };
      })
      .attr("transform", (d) => {
        return `translate(${x(d.value.time)}, ${y(d.value.value)})`;
      })
      .attr("x", 12)
      .text((d) => d.name)
      .style("fill", (d) => {
        return colorSet(d.name);
      });

    group
      .append("text")
      .attr("class", (d) => {
        return d.name;
      })
      .attr("x", (d, i) => {
        return 30 + i * 60;
      })
      .attr("y", 30)
      .text((d) => {
        return d.name;
      })
      .style("fill", (d) => {
        return colorSet(d.name);
      })
      .style("font-size", 15);
    // .on("click", (d) => { // getAttribute 가 안됨.
    //   let currentOpacity = d3.selectAll(`.${d.name}`).style("opacity");
    //   console.log("click d", d);
    //   console.log("currentOpacity", currentOpacity);
    // d3.selectAll(`.${d.name}`)
    //   .transition()
    //   .style("opacity", currentOpacity == 1 ? 0 : 1);
    //})
  };

  const getDataAPI = async () => {
    d3.csv(url).then((res) => {
      //console.log(res);
      setLineData({
        ...lineData,
        data: res,
      });
    });
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
          <div id="line-chart02"></div>
        </div>
      </div>
    </div>
  );
}
