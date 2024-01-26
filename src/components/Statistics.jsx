import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';

const Events = (props) => {

    const recruitmentChartRef = useRef();
    const typeOfInterviewChartRef = useRef();

    const RecruitmentData = [
        { label: 'Recruitment', value: props.companies.filter(item => item.recruitment_company === true).length },
        { label: 'In-House', value: props.companies.filter(item => item.recruitment_company === false).length },
    ];
    const TypeOfInterviewData = [
        { label: 'Intake', value: 1 },
        { label: 'Follow-up', value: 2 },
        { label: 'Company', value: 2 },
    ];


    useEffect(() => {
        props.companies.length > 0 && drawRecruitmentChart();
        drawTypeofInterviewChart();
    }, []);

    const drawRecruitmentChart = () => {
        d3.select(recruitmentChartRef.current).select('svg').remove();

        const width = '200';
        const height = '200';
        const radius = Math.min(width, height) / 2;

        // Set up the chart
        const svg = d3.select(recruitmentChartRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        // Create a color scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Create a pie chart
        const pie = d3.pie().value(d => d.value);
        const dataReady = pie(RecruitmentData);

        // Build the pie chart
        svg.selectAll('pieces')
            .data(dataReady)
            .enter()
            .append('path')
            .attr('d', d3.arc().innerRadius(radius * 0.6).outerRadius(radius))
            .attr('fill', d => color(d.data.label))
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .style('opacity', 0.7);

        // Add labels
        svg.selectAll('pieces')
            .data(dataReady)
            .enter()
            .append('text')
            .text(d => d.data.label)
            .attr('transform', d => `translate(${d3.arc().innerRadius(radius * 0.5).outerRadius(radius).centroid(d)})`)
            .style('text-anchor', 'middle')
            .style('font-size', '12px');
    };


    const drawTypeofInterviewChart = () => {
        // Clear previous content
        d3.select(typeOfInterviewChartRef.current).select('svg').remove();
    
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 200 - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom;
    
        const svg = d3.select(typeOfInterviewChartRef.current)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
    
        const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
          .domain(TypeOfInterviewData.map(d => d.label));
    
        const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(TypeOfInterviewData, d => d.value)]);
    
        svg.selectAll('.bar')
          .data(TypeOfInterviewData)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.label))
          .attr('width', x.bandwidth())
          .attr('y', d => y(d.value))
          .attr('height', d => height - y(d.value))
          .style('fill', 'steelblue');
    
        svg.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x));
    
        svg.append('g')
          .call(d3.axisLeft(y));
      };

    return (
        <div className="card statistics">
            <h2>Statistics</h2>
            <div className="charts">
                <div className="chart">
                    <h3>Type of companies</h3>
                    <div className="chartItem" ref={recruitmentChartRef} />
                </div>
                <div className="chart">
                    <h3>Type of Interviews (dummy data)</h3>
                    <div className="chartItem" ref={typeOfInterviewChartRef} />
                </div>
                <div className="chart">
                    <h3>xxx</h3>
                    {/* <div className="chartItem" ref={recruitmentChartRef} /> */}
                </div>
                <div className="chart">
                    <h3>Amount interview with company</h3>
                    (pie chart)
                    {/* <div className="chartItem" ref={recruitmentChartRef} /> */}
                </div>
            </div>
        </div>
    );
}

export default Events;
