import * as d3 from "d3";
import React from "react";
import Header from "../../../src/components/layout/header";
import { useEffect } from "react";

export default function PieChart01() {
  const width = 400;
  const height = 400;

  const drawPieChart = (getData) => {
    let radius = (Math.min(width, height) / 2) * 0.8;

    const svg = d3
      .select("#pie-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const colorRange = d3
      .scaleOrdinal()
      .domain(getData.map((d) => d.name))
      .range(
        d3
          .quantize(
            (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
            getData.length
          )
          .reverse()
      );
    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => {
        console.log("d", d);
        return d.value;
      });
    const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

    const dataRemake = pie(getData);
    console.log("dataRemake", dataRemake);

    svg
      .selectAll("path")
      .data(dataRemake)
      .join("path")
      .attr("fill", (d) =>
        //console.log(d)
        {
          return colorRange(d.data.name);
        }
      )
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.data.name}: ${d.data.value.toString()}`);

    svg
      .append("g")
      .style("font-size", 12)
      .style("text-anchor", "middle")
      .selectAll("text")
      .data(dataRemake)
      .join("text")
      .attr("transform", (d) => {
        let center = arcLabel.centroid(d);
        console.log("center", center);
        return `translate(${center[0]},${center[1]})`;
      })
      .call((text) =>
        text.filter((d) => d.endAngle - d.startAngle > 0.25).append("tspan")
      )
      .attr("x", 0)
      .attr("y", "0.7em")
      .attr("fill-opacity", 0.7)
      .text((d) => d.data.value.toString());

    svg
      .append("g")
      .style("font-size", 12)
      .style("text-anchor", "middle")
      .selectAll("text")
      .data(dataRemake)
      .join("text")
      .attr("transform", (d) => {
        let center = arcLabel.centroid(d);
        console.log("center", center);
        return `translate(${center[0]},${center[1]})`;
      })
      .call((text) => text.append("tspan"))
      .attr("x", 0)
      .attr("y", "-0.4em")
      .text((d) => d.data.name);
  };

  useEffect(() => {
    const data = [
      { name: "<5", value: 199120 },
      { name: "5-9", value: 205019 },
      { name: "10-14", value: 206797 },
      { name: "15-19", value: 213544 },
      { name: "20-24", value: 326042 },
      { name: "25-29", value: 216980 },
      { name: "30-34", value: 211836 },
    ];

    drawPieChart(data);
  }, []);

  return (
    <div>
      <Header title="D3 LINECHART" />
      <div>
        <div className="chart-set">
          <div id="pie-chart"></div>
        </div>
      </div>
    </div>
  );
}
