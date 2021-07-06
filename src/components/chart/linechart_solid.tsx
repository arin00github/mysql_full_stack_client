import * as d3 from "d3";
import { useEffect, useState } from "react";

interface ILineChartProps {
  data: any;
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  name: string;
  color?: string;
  domain?: string[];
  label?: boolean;
  tooltipShow?: boolean;
}

export default function LineChart01({
  data,
  name,
  margin,
  tooltipShow,
}: ILineChartProps) {
  let width = 460 - margin.left - margin.right;
  let height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(`#${name}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create a tooltip
  // 원하는 위치에 잘 안나타옴
  const tooltip = d3
    .select(`#${name}`)
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radisu", "5px")
    .style("padding", "5px");

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function (d) {
    tooltipShow ? tooltip.style("opacity", 1) : tooltip.style("opacity", 0);
  };
  const mousemove = function (d) {
    let id = d.target.getAttribute("data-fip");
    //console.log(d3.pointer(d));
    //console.log(d);
    tooltip
      .html("Exact value: " + id)
      .style("left", d3.pointer(d)[0] + 360 + "px")
      .style("top", d3.pointer(d)[1] + 70 + "px");
  };
  const mouseleave = function (d) {
    tooltip.style("opacity", 0);
  };

  const drawLineChart = async () => {
    const domainValue = d3.extent(
      data.map((it) => {
        return new Date(it.date);
      })
    );
    console.log("domainValue", domainValue);

    //X axis
    const x = d3.scaleTime().domain(domainValue).range([0, width]);
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    //Y axis
    const y = d3.scaleLinear().domain([8000, 9000]).range([height, 0]);
    g.append("g").call(d3.axisLeft(y));

    // line connect
    g.append("path")
      .datum(data)
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

    // dot create
    g.append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("data-fip", (d) => {
        return d.value;
      })
      .attr("cx", (d) => x(new Date(d.date)))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("fill", "#69b3a2")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  };

  useEffect(() => {
    if (data !== undefined) {
      console.log("line-drawChart");
      drawLineChart();
    }
  }, [data]);
  return <div className="chart" id={name}></div>;
}
