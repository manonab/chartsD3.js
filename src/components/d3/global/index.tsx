import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface GlobalProps {
  value: number;
}

export const GlobalChart: React.FC<GlobalProps> = ({ value }) => {
  const width = 600;
  const height = 600;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const colors = ['#77B65D', '#FFE436', '#FF8B3B', '#DC2626'];

    const greenZone = { min: 0.0, max: 1.0 };
    const yellowZone = { min: 1.1, max: 2.0 };
    const orangeZone = { min: 2.1, max: 3.0 };
    const redZone = { min: 3.1, max: 4.0 };

    const totalAngle = Math.PI;
    const greenAngle = (greenZone.max - greenZone.min) * (totalAngle / 4);
    const yellowAngle = (yellowZone.max - yellowZone.min) * (totalAngle / 4);
    const orangeAngle = (orangeZone.max - orangeZone.min) * (totalAngle / 4);
    const redAngle = (redZone.max - redZone.min) * (totalAngle / 4);

    const pie = d3.pie<number>()
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    const data = [greenAngle, yellowAngle, orangeAngle, redAngle];

    const arcGenerator = d3.arc<any, d3.DefaultArcObject>()
      .innerRadius(220)
      .outerRadius(width / 2);

    const arcs = pie(data);

    svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr("d", (d: any, i: number) => arcGenerator(d))
      .attr('fill', (_, i) => colors[i])
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arrowLength = 100;
    const arrowWidth = 10;
    const arrowRotation = value * 180;

    const arrowCoordinates = [
      [0, 0],
      [arrowLength, 0],
      [arrowLength - arrowWidth, -arrowWidth / 2],
      [arrowLength, 0],
      [arrowLength - arrowWidth, arrowWidth / 2],
      [arrowLength, 0]
    ];
    const lineGenerator = d3.line<number[]>();
    const arrowLine = lineGenerator(arrowCoordinates);

    svg.append('path')
      .attr('d', arrowLine)
      .attr('fill', 'black')
      .attr('transform', `translate(${width / 2}, ${height / 2}) rotate(${arrowRotation})`);

  }, [value, height, width]);

  return (
    <svg ref={svgRef} width={width} height={height} className="mx-auto my-20">
      <g transform={`translate(${width / 2}, ${height / 2})`} />
    </svg>
  );
};
