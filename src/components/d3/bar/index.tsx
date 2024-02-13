import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarProps {
  data: number[];
}

const BarChart: React.FC<BarProps> = ({ data }) => {
  const width = 500;
  const height = 500;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const x = d3.scaleBand()
      .domain(data.map((d, i) => i.toString()))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([height, 0]);

    const svg = d3.select(svgRef.current);
    const barGroup = svg.append('g').attr('transform', `translate(0, ${height})`);

    barGroup.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i.toString()) || 0)
      .attr('y', d => y(d))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d));

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  }, [data, height, width]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
};

export default BarChart;
