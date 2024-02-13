import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  category: string;
  riskLevel: number;
}

const RadarChart: React.FC = () => {
  const width = 400;
  const height = 600;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const data: DataPoint[] = [
      { category: 'Périmètre fonctionnel', riskLevel: 3 },
      { category: 'Contrat projet', riskLevel: 4 },
      { category: 'Ecosystème projet', riskLevel: 2 },
      { category: 'Equipe projet', riskLevel: 5 },
      { category: 'Technique', riskLevel: 3 },
    ];

    const numCategories = data.length;

    const maxRadius = Math.min(width, height) / 4;

    const rScale = d3.scaleLinear()
      .domain([0, 5])
      .range([0, maxRadius]);

    const angleSlice = Math.PI * 2 / numCategories;

    const colors = ['#6B7280', '#6B7280', '#6B7280', '#6B7280', '#6B7280'];
    const targetColors = ['#dc2626', '#FFE436', '#F29D38', '#77B65D', "#77B65D"];
    const targetRadius = maxRadius / 5;

    for (let i = 0; i < targetColors.length; i++) {
      svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', targetRadius * (targetColors.length - i))
        .attr('fill', targetColors[i]);
    }

    for (let i = 1; i <= 5; i++) {
      svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', maxRadius / 5 * i)
        .attr('fill', 'none')
        .attr('stroke', colors[i - 1])
        .attr('stroke-width', 1);
    }

    for (let i = 0; i <= 5; i++) {
      svg.append('text')
        .attr('x', width / 2.06 + rScale(i) * Math.cos(-Math.PI / 2))
        .attr('y', height / 2 + rScale(i) * Math.sin(-Math.PI / 2))
        .text(i.toString())
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle');
    }

    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;

      const targetEndX = width / 2 + maxRadius * Math.cos(angle);
      const targetEndY = height / 2 + maxRadius * Math.sin(angle);

      svg.append('line')
        .attr('x1', width / 2)
        .attr('y1', height / 2)
        .attr('x2', targetEndX)
        .attr('y2', targetEndY)
        .attr('stroke', '#E5E7EB')
        .attr('stroke-width', 2);

      const labelRadius = rScale(5) + 50;

      const labelX = width / 2 + (labelRadius * Math.cos(angle));
      const labelY = height / 2 + (labelRadius * Math.sin(angle));

      svg.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .text(d.category)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('fill', 'black');
    });


    const pointsData: [number, number][] = data.map((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      return [width / 2 + rScale(d.riskLevel) * Math.cos(angle), height / 2 + rScale(d.riskLevel) * Math.sin(angle)];
    });

    const lineGenerator = d3.line()
      .x((d: any) => d[0])
      .y((d: any) => d[1])
      .curve(d3.curveLinearClosed);

    svg.append('path')
      .datum(pointsData)
      .attr('d', lineGenerator)
      .attr('fill', '#779FE5')
      .attr('opacity', 0.5);

  }, [height, width]);

  return (
    <svg ref={svgRef} width={width} height={height} style={{ margin: "0 200px" }}>

    </svg>
  );
};

export default RadarChart;
