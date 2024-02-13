import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BubbleDatas } from '../../../models';

interface BubbleProps {
  data: BubbleDatas[];
  color: string;
}

const BubbleChart: React.FC<BubbleProps> = ({ data, color }) => {
  const width = 500;
  const height = 500;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = d3.select(svgRef.current);

    const sourceRisk = data.find(d => d.risk_type === 'source');

    if (!sourceRisk) return;

    const aggravatingRisks = data.filter(d => d.risk_type === 'aggravating');

    const sourceX = width / 2;
    const sourceY = height / 2;
    const sourceRadius = sourceRisk.riskLevel;

    svg.append('circle')
      .attr('cx', sourceX)
      .attr('cy', sourceY)
      .attr('r', sourceRadius)
      .style('fill', '#3B82F680')
      .style('z-index', "5");


    const sortedAggravatingRisks = aggravatingRisks.sort((a, b) => b.riskLevel - a.riskLevel);
    const numAggravatingRisks = sortedAggravatingRisks.length;
    const maxRadius = Math.min(width, height) / 3;

    sortedAggravatingRisks.forEach((risk, index) => {
      const angle = (index / numAggravatingRisks) * Math.PI * 2;
      const xPos = sourceX + Math.cos(angle) * maxRadius;
      const yPos = sourceY + Math.sin(angle) * maxRadius;


      svg.append('defs')
        .append('pattern')
        .attr('id', 'diagonalHatch')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 8)
        .attr('height', 8)
        .append('path')
        .attr('d', 'M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2')
        .attr('stroke', `${color}`)
        .attr('stroke-width', 2)
        .style('fill', 'none');


      svg.append('circle')
        .attr('cx', xPos)
        .attr('cy', yPos)
        .attr('r', risk.riskLevel)
        .style('fill', 'url(#diagonalHatch)')


      svg.append('line')
        .attr('x1', sourceX)
        .attr('y1', sourceY)
        .attr('x2', xPos)
        .attr('y2', yPos)
        .attr('stroke', '#3B82F6')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('fill', 'none')
        .style('z-index', "0");
    });

  }, [data, height, width, color]);

  return (
    <svg ref={svgRef} width={width} height={height} className="mx-auto my-20"></svg>
  );
};

export default BubbleChart;
