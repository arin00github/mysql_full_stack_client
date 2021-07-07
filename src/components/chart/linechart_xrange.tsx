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
  label?: boolean;
}

export default function LineChartXRange({
  data,
  name,
  margin,
}: ILineChartProps) {
  let width = 460 - margin.left - margin.right;
  let height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select(`#${name}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Three function that change the tooltip when user hover / move / leave a cell

  const drawChart = (data) => {
    const domainValue = d3.extent(
      data.map((it) => {
        return new Date(it.date);
      })
    );
    console.log("domainValue", domainValue);

    // Add X axis
    const x = d3.scaleTime().domain(d3.extent(domainValue)).range([0, width]);
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => {
          return +d.value;
        }),
      ])
      .range([height, 0]);
    const yAxis = svg.append("g").call(d3.axisLeft(y));

    // Add a clipPath: everything out of this area won't be drawn.
    const clip = svg
      .append("defs")
      .append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);

    // Add brushing
    const brush = d3
      .brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("end", updateChart);

    // Create the line variable: where both the line and the brush take place
    const line = svg.append("g").attr("clip-path", "url(#clip)");

    // Add the line
    line
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => {
            return x(d.date);
          })
          .y((d) => {
            return y(d.value);
          })
      );
    // Add the brushing
    line.append("g").attr("class", "brush").call(brush);

    // A function that set idleTimeOut to null
    let idleTimeout;
    function idled() {
      idleTimeout = null;
    }

    // A function that update the chart for given boundaries
    function updateChart(event) {
      let extent = event.selection;
      //console.log("extent", extent);

      // What are the selected boundaries?
      if (!extent) {
        if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350));
        x.domain([4, 8]);
      } else {
        x.domain([x.invert(extent[0]), x.invert(extent[1])]);
        line.select(".brush").call(brush.move, null);
      }

      // Update axis and line position
      xAxis.transition().duration(1000).call(d3.axisBottom(x));
      line
        .select(".line")
        .transition()
        .duration(1000)
        .attr(
          "d",
          d3
            .line()
            .x((d) => {
              return x(d.date);
            })
            .y((d) => {
              return y(d.value);
            })
        );
    }

    // If user double click, reinitialize the chart
    svg.on("dblclick", function (event) {
      //console.log("dbclick event", event);
      //console.log("domainValue2", domainValue);
      x.domain(domainValue);
      xAxis.transition().call(d3.axisBottom(x));
      line
        .select(".line")
        .transition()
        .attr(
          "d",
          d3
            .line()
            .x((d) => {
              return x(d.date);
            })
            .y((d) => {
              return y(d.value);
            })
        );
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      console.log("line-drawChart");
      drawChart(data);
    }
  }, [data]);
  return <div className="chart" id={name}></div>;
}
