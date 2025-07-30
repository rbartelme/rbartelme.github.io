'use client'
import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface DataPoint {
  x: number
  y: number
  label?: string
  category?: string
}

interface ScatterPlotProps {
  data: DataPoint[]
  width?: number
  height?: number
  xLabel?: string
  yLabel?: string
  title?: string
  xScale?: 'linear' | 'log'
  yScale?: 'linear' | 'log'
}

export default function ScatterPlot({ 
  data, 
  width = 600, 
  height = 400,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  title,
  xScale = 'linear',
  yScale = 'linear'
}: ScatterPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [containerWidth, setContainerWidth] = useState(width)

  // Calculate responsive dimensions while keeping aspect ratio
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const available = containerRef.current.offsetWidth
        setContainerWidth(Math.min(available, width))
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [width])

  // Calculate scaled dimensions
  const scale = containerWidth / width
  const scaledHeight = height * scale

  useEffect(() => {
    if (!svgRef.current || !data.length) return

    d3.select(svgRef.current).selectAll("*").remove()

    const margin = { top: title ? 40 : 20, right: 20, bottom: 60, left: 80 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const xScaleFunc = xScale === 'log' ? d3.scaleLog() : d3.scaleLinear()
    const yScaleFunc = yScale === 'log' ? d3.scaleLog() : d3.scaleLinear()

    const xExtent = d3.extent(data, d => d.x) as [number, number]
    const yExtent = d3.extent(data, d => d.y) as [number, number]

    xScaleFunc.domain(xExtent).range([0, innerWidth])
    yScaleFunc.domain(yExtent).range([innerHeight, 0])

    // Fix the TypeScript issue here
    const categories = Array.from(new Set(
      data.map(d => d.category).filter((cat): cat is string => Boolean(cat))
    ))
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(categories)

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScaleFunc))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 45)
      .attr('fill', 'black')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(xLabel)

    g.append('g')
      .call(d3.axisLeft(yScaleFunc))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(yLabel)

    if (title) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(title)
    }

    // Add data points
    g.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScaleFunc(d.x))
      .attr('cy', d => yScaleFunc(d.y))
      .attr('r', 4)
      .attr('fill', d => d.category ? colorScale(d.category) : 'steelblue')
      .attr('opacity', 0.7)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // Clean up any existing tooltips first
        d3.selectAll('.d3-tooltip').remove()
        
        const tooltip = d3.select('body').append('div')
          .attr('class', 'd3-tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('padding', '8px')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('opacity', 0)
          .style('z-index', '1000')

        tooltip.transition().duration(200).style('opacity', 0.9)
        tooltip.html(`${d.label || 'Point'}<br/>X: ${d.x}<br/>Y: ${d.y}${d.category ? `<br/>Category: ${d.category}` : ''}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px')

        d3.select(this).attr('r', 6)
      })
      .on('mouseout', function() {
        d3.selectAll('.d3-tooltip').remove()
        d3.select(this).attr('r', 4)
      })

    // Add legend if categories exist
    if (categories.length > 0) {
      const legend = svg.append('g')
        .attr('transform', `translate(${width - 120}, 30)`)

      legend.selectAll('.legend-item')
        .data(categories)
        .enter().append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`)
        .each(function(d) {
          const item = d3.select(this)
          item.append('circle')
            .attr('r', 4)
            .attr('fill', colorScale(d))
          item.append('text')
            .attr('x', 10)
            .attr('y', 0)
            .attr('dy', '0.35em')
            .style('font-size', '12px')
            .text(d)
        })
    }

    // Cleanup function
    return () => {
      d3.selectAll('.d3-tooltip').remove()
    }

  }, [data, width, height, xLabel, yLabel, title, xScale, yScale])

  return (
    <div 
      ref={containerRef}
      className="my-8 p-4 bg-white border rounded-lg shadow-sm w-full"
      style={{ maxWidth: `${width}px` }}
    >
      <svg 
        ref={svgRef}
        className="w-full h-auto"
        style={{ height: `${scaledHeight}px` }}
      />
    </div>
  )
}