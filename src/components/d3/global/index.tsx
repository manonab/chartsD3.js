import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface GlobalProps {
  value: number;
}

export const GlobalChart: React.FC<GlobalProps> = ({ value }) => {
  const width = 400;
  const height = 400;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const colors = ['#77B65D', '#FFE436', '#FF8B3B', '#DC2626'];

    const greenZone = { min: 0.0, max: 1.0 };
    const yellowZone = { min: 1.1, max: 2.0 };
    const orangeZone = { min: 2.1, max: 3.0 };
    const redZone = { min: 3.1, max: 4.0 };

    const maxAngle = Math.PI / 2;
    let arrowRotation = 0;

    if (value >= greenZone.min && value <= greenZone.max) {
      arrowRotation = ((value - greenZone.min) / (greenZone.max - greenZone.min)) * maxAngle / 4;
    } else if (value > greenZone.max && value <= yellowZone.max) {
      arrowRotation = maxAngle;
    }

    const totalAngle = Math.PI;
    const segments = 10;

    const pie = d3.pie<number>()
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    const data = [
      ...Array(segments).fill((greenZone.max - greenZone.min) * (totalAngle / 4) / segments),
      ...Array(segments).fill((yellowZone.max - yellowZone.min) * (totalAngle / 4) / segments),
      ...Array(segments).fill((orangeZone.max - orangeZone.min) * (totalAngle / 4) / segments),
      ...Array(segments).fill((redZone.max - redZone.min) * (totalAngle / 4) / segments)
    ];

    const arcGenerator = d3.arc<any, d3.DefaultArcObject>()
      .innerRadius(220)
      .outerRadius(width / 2);

    const arcs = pie(data);

    svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr("d", (d: any, i: number) => arcGenerator(d))
      .attr('fill', (_, i) => colors[Math.floor(i / segments)])
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    svg.append('path')
      .attr('d', 'M0,-5 L10,0 L0,5 Z')
      .attr('fill', 'black')
      .attr('transform', `translate(${width / 2}, ${height / 2}) rotate(${arrowRotation * (180 / Math.PI)})`);

  }, [value, height, width]);



  return (
    <svg ref={svgRef} width={width} height={height} />
  );
};
