import axios from "axios";
import * as d3 from "d3";
import { useEffect, useState } from "react";

export default function Chart01() {
  const [barData, setBarData] = useState({
    data: undefined,
  });

  const dataAPI = () => {
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv"
    ).then((res) => {
      setBarData({
        ...barData,
        data: res,
      });
      drawMap();
    });
  };
  const margin = { top: 20, right: 20, bottom: 40, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  //scaleLinear()
  const svg = d3.select("#chart").append("svg").attr("width", 1000);
  const x = d3.scaleLinear().domain([0, 100]).range([100, 800]);
  svg.append("g").attr("transform", "translate(0, 50").call(d3.axisBottom(x));

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", 700)
    .attr("y", 40)
    .text("X axis Title");

  //scalePoint();
  const svg2 = d3
    .select("#chart2")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 300);
  const x2 = d3.scalePoint().domain(["A", "B", "C", "D"]).range([100, 800]);
  svg2
    .append("g")
    .attr("transform", "translate(0, 150)")
    .call(d3.axisBottom(x2));
  svg2.append("circle").attr("cx", x2("B")).attr("cy", 50).attr("r", 8);

  //scaleBend()

  const svg3 = d3
    .select("#chart3")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 300);
  const x3 = d3
    .scaleBand()
    .domain(["A", "B", "C", "D"])
    .range([100, 800])
    .padding(0.8);
  svg3.append("g").attr("transform", "translate(0, 80").call(d3.axisBottom(x3));
  svg3
    .append("rect")
    .attr("x", x3("C"))
    .attr("y", 0)
    .attr("height", 150)
    .attr("width", x3.bandwidth())
    .style("fill", "red");

  const svg4 = d3
    .select("#chart4")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 200);
  const x4 = d3
    .scaleBand()
    .domain(["Korea", "Japan", "US", "France", "Canada", "Brazil"])
    .range([50, 800]);
  svg4
    .append("g")
    .attr("transform", "translate(100,100)")
    .call(d3.axisBottom(x4))
    .selectAll("text")
    .attr("transform", "translate(-10, 10) rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", 10);

  const drawMap = () => {};

  useEffect(() => {
    if (barData.data !== undefined) {
      drawMap();
    }
  }, [barData.data]);

  useEffect(() => {
    //getData();
    dataAPI();
  }, []);

  return (
    <div>
      <h2>Weather Chart</h2>
      <div id="chart"></div>
      <div id="chart2"></div>
      <div id="chart3"></div>
      <div id="chart4"></div>
    </div>
  );
}
