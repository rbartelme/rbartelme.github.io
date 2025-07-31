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
  legendWidth?: number
}

export default function ScatterPlot({ 
  data, 
  width = 600, 
  height = 400,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  title,
  xScale = 'linear',
  yScale = 'linear',
  legendWidth = 120
}: ScatterPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const plotSvgRef = useRef<SVGSVGElement>(null)
  const legendSvgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({
    containerWidth: width,
    isMobile: false
  })

  // Get unique categories
  const categories = Array.from(new Set(
    data.map(d => d.category).filter((cat): cat is string => Boolean(cat))
  ))
  const hasCategories = categories.length > 0

  // Mobile breakpoint
  const MOBILE_BREAKPOINT = 768

  // Calculate the total width needed
  const totalDesiredWidth = width + (hasCategories ? legendWidth + 20 : 0) // 20px gap
  
  // Calculate responsive dimensions while keeping aspect ratio
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.offsetWidth || window.innerWidth
        const availableWidth = parentWidth - 32 // Account for padding (16px * 2)
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT
        
        let containerWidth
        if (isMobile) {
          // On mobile, use full available width and stack vertically
          containerWidth = Math.min(availableWidth, width)
        } else {
          // On desktop, use normal responsive scaling
          containerWidth = Math.min(availableWidth, totalDesiredWidth)
        }
        
        setDimensions({ containerWidth, isMobile })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [totalDesiredWidth, width])

  // Calculate scaled dimensions
  const { containerWidth, isMobile } = dimensions
  const scale = isMobile 
    ? containerWidth / width  // On mobile, scale based on plot width only
    : containerWidth / totalDesiredWidth  // On desktop, scale based on total width
  
  const scaledPlotWidth = width * scale
  const scaledPlotHeight = height * scale
  const scaledLegendWidth = hasCategories ? (isMobile ? containerWidth : legendWidth * scale) : 0

  // Render the main plot
  useEffect(() => {
    if (!plotSvgRef.current || !data.length) return

    d3.select(plotSvgRef.current).selectAll("*").remove()

    const margin = { top: title ? 40 : 20, right: 20, bottom: 60, left: 80 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(plotSvgRef.current)
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

    // Add title
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

    // Cleanup function
    return () => {
      d3.selectAll('.d3-tooltip').remove()
    }

  }, [data, width, height, xLabel, yLabel, title, xScale, yScale, categories, isMobile])

  // Render the legend
  useEffect(() => {
    if (!legendSvgRef.current || !hasCategories) return

    d3.select(legendSvgRef.current).selectAll("*").remove()

    const legendHeight = Math.max(categories.length * 25 + 20, 100) // Dynamic height based on categories
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(categories)

    const svg = d3.select(legendSvgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${legendWidth} ${legendHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')

    // Add legend title
    svg.append('text')
      .attr('x', 10)
      .attr('y', 15)
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text('Categories')

    // Add legend items
    const legend = svg.append('g')
      .attr('transform', 'translate(10, 25)')

    legend.selectAll('.legend-item')
      .data(categories)
      .enter().append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 25})`)
      .each(function(d) {
        const item = d3.select(this)
        item.append('circle')
          .attr('r', 4)
          .attr('fill', colorScale(d))
          .attr('cx', 5)
          .attr('cy', 0)
        item.append('text')
          .attr('x', 15)
          .attr('y', 0)
          .attr('dy', '0.35em')
          .style('font-size', '12px')
          .text(d)
      })

  }, [categories, legendWidth, hasCategories, isMobile, containerWidth])

  return (
    <div 
      ref={containerRef}
      className="my-8 p-4 bg-white border rounded-lg shadow-sm w-full max-w-full"
    >
      <div 
        className={`flex items-start gap-5 ${isMobile ? 'flex-col' : 'flex-row'}`}
        style={{ width: 'fit-content', margin: '0 auto' }}
      >
        {/* Main plot SVG */}
        <div className={`${isMobile ? 'w-full' : 'flex-shrink-0'}`}>
          <svg 
            ref={plotSvgRef}
            className="w-full h-auto"
            style={{ 
              width: `${scaledPlotWidth}px`,
              height: `${scaledPlotHeight}px` 
            }}
          />
        </div>
        
        {/* Legend SVG - only render if categories exist */}
        {hasCategories && (
          <div className={`${isMobile ? 'w-full flex justify-center' : 'flex-shrink-0'}`}>
            <svg 
              ref={legendSvgRef}
              className="h-auto"
              style={{ 
                width: `${scaledLegendWidth}px`,
                height: `${Math.max(categories.length * 25 + 20, 100) * scale}px`
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}