import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { DataItem } from '../../../models';

interface DonutProps {
  data: DataItem[];
}

export const DonutChart: React.FC<DonutProps> = ({ data }) => {
  const width = 480;
  const height = 600;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const colorMap: { [label: string]: string } = {
      "Réponses": "#3B82F6",
      "Ne sais pas": "#779FE5",
      "Sans réponses": "#153B7A"
    };
    const innerRadius = 140;
    const outerRadius = Math.min(width, height) / 2;
    const arcGenerator = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const pieGenerator = d3.pie<DataItem>().value(d => d.percentage);
    const arcs =
      svg.selectAll()
        .data(pieGenerator(data))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    arcs.append("path")
      .attr("d", (d: any) => arcGenerator(d))
      .style("fill", (d, i) => {
        return colorMap[d.data.label] || "#3B82F6";
      });

    arcs.append("line")
      .attr("stroke", "black")
      .attr('stroke-width', 2)
      .attr("x1", (d: any) => Math.cos((d.startAngle + d.endAngle) / 2) * outerRadius)
      .attr("y1", (d: any) => Math.sin((d.startAngle + d.endAngle) / 2) * outerRadius)
      .attr("x2", (d: any) => Math.cos((d.startAngle + d.endAngle) / 2) * (outerRadius + 20))
      .attr("y2", (d: any) => Math.sin((d.startAngle + d.endAngle) / 2) * (outerRadius + 20));


    arcs.append("text")
      .attr("transform", (d: any) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${Math.cos((d.startAngle + d.endAngle) / 2) * (outerRadius + 40)},${Math.sin((d.startAngle + d.endAngle) / 2) * (outerRadius + 40)})`; // Ajustez la distance de l'étiquette
      })
      .attr("text-anchor", "middle")
      .text((d: any) => `${d.data.percentage}%`)
      .style('font-size', "14px")
      .style('width', "100px")

  }, [data, height, width]);

  return (
    <svg ref={svgRef} width={width} height={height} className="mx-auto my-20">
      <g transform={`translate(${width / 2}, ${height / 2})`} />
    </svg>
  );
};