import * as d3 from "d3";
import React, { useEffect } from "react";

export interface IdonutChartProps {
  name: string;
  size: { width: number; height: number; margin: number };
  data: any;
  color?: string[];
}

export default function DonutChartBasic({
  name,
  size,
  data,
  color,
}: IdonutChartProps) {
  const { width, height, margin } = size;
  const radius = Math.min(width, height) / 2 - margin;
  const colorRange = color;

  const drawDonutChart = (insertData) => {
    //기존에 있는 svgchart를 지운다.
    d3.select(`#${name}`).select("svg").remove();
    console.log("03.draw donutchart");

    //svgchart를 새로 생성
    const svg = d3
      .select(`#${name}`) // rencer부분이 다 초기실행 되고나서 select가 읽혀야 한다. 그렇지 않으면 id가 읽히지 않음
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(insertData))
      .range(colorRange);

    //console.log("color", color);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => {
        //console.log("value", d);
        return d.value;
      });
    let dataRemake = Object.entries(insertData).map((it) => {
      return { key: it[0], value: it[1] };
    });

    //console.log("dataRemake", dataRemake);
    const data_ready = pie(dataRemake);
    //console.log("data_ready", data_ready);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);
    const outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const slice = svg.selectAll("path").data(data_ready);
    slice
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => {
        //console.log(d.data);
        return color(d.data.key);
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    const polyline = svg.selectAll("polyline").data(data_ready);

    polyline
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("points", (d) => {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
        //console.log(posA, posB, posC);
        return [posA, posB, posC];
      });

    const label = svg.selectAll("text").data(data_ready);

    label
      .enter()
      .append("text")
      .text((d) => {
        //console.log("d", d.data);
        return d.data.key;
      })
      .attr("transform", (d) => {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", (d) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });
  };

  useEffect(() => {
    console.log("02.useEffect getData!!");

    drawDonutChart(data);
  }, [data]);

  return <div id={name}></div>;
}
