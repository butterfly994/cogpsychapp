import React from 'react'
import * as d3 from 'd3'

class Visualization extends React.Component {
    componentDidMount() {
        // 2. Use the margin convention practice 
        var margin = {
                top: 100,
                right: 100,
                bottom: 150,
                left: 100
            },
            width = window.innerWidth / 2 - margin.left - margin.right // Use the window's width 
            ,
            height = window.innerHeight / 2 - margin.top - margin.bottom; // Use the window's height

        // 5. X scale will use the index of our data
        var xScale = d3.scaleLinear()
            .domain([this.props.xMin, this.props.xMax]) // input
            .range([0, width]); // output

        // 6. Y scale will use the randomly generate number 
        var yScale = d3.scaleLinear()
            .domain([this.props.yMin, this.props.yMax]) // input 
            .range([height, 0]); // output 

        // 7. d3's line generator
        var line = d3.line()
            .x(function (d) {
                return xScale(d.x);
            }) // set the x values for the line generator
            .y(function (d) {
                return yScale(d.y);
            }) // set the y values for the line generator 


        // 1. Add the SVG to the page and employ #2
        var svg = d3.select('.' + this.props.name).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        //add title
        svg.append('text')
            .attr('transform',
                'translate(' + (width / 2) + ' ,' + (0 - margin.top / 2) + ')')
            .style('text-anchor', 'middle')
            .style('font-size', '18pt')
            .text(this.props.title)

        // 3. Call the x axis in a group tag
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        // text label for the x axis
        svg.append('text')
            .attr('transform',
                'translate(' + (width / 2) + ' ,' +
                (height + 50) + ')')
            .style('text-anchor', 'middle')
            .style('font-size', '14pt')
            .text(this.props.xAxis);
        
        // description for the graph
        svg.append('text')
            .attr('transform',
                'translate(50, ' + (height + margin.top) + ')')
            .style('font-size', '12pt')
            .text(this.props.description)

        // 4. Call the y axis in a group tag
        svg.append('g')
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // text label for the y axis
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left/1.5)
            .attr('x', 0 - (height / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('font-size', '14pt')
            .text(this.props.yAxis);

        // 9. Append the path, bind the data, and call the line generator 
        svg.append('path')
            .datum(this.props.dataset) // 10. Binds data to the line 
            .attr('fill', 'none')
            .attr('stroke', 'navy')
            .attr('stroke-width', '3')
            .attr('d', line); // 11. Calls the line generator 

        // 12. Appends a circle for each datapoint 
        //triangle = 5, circle = 0, square = 3, cross = 1, x same index as cross, but have to add 'rotate(-45)' to its transform
        svg.selectAll('.dot')
            .data(this.props.dataset)
            .enter().append('path')
            .attr('stroke', '#fff')
            .attr('fill', '#ffab00')
            .attr('d', d3.symbol().type(function (d) {
                return d3.symbols[d.pointType % 5];
            }))
            .attr('transform', function (d) {
                if (d.pointType > 5) {
                    return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ') rotate(-45)'
                } else {
                    return 'translate(' + xScale(d.x) + ',' + yScale(d.y) + ')'
                }
            })
    }

    render() {
        return ( 
            <div className = {this.props.name} style = {{display: 'inline-block'}}></div>
        )
    }
}

export default Visualization