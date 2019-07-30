import React from 'react'
import * as d3 from 'd3'
import './Visualizations.css'
import Visualization from './Visualization';

class Visualizations extends React.Component {
    render() {
        let n = 21
        console.log(d3.range(n))
        let dataset1 = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)(), 'x': d, 'pointType': 6} })
        console.log(dataset1)
        let dataset2 = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)(), 'x': d, 'pointType': 3 } })
        return (
            <div>
                <div className = 'paragraph'>
                    The code for symbols: x - inputs with letters all on one line, 
                    + - input with six letters closely spaced, o - 2 x 3, 2 x 4, 2 x 5 
                    grids, square - 3 x 3 grid, triangle - 2 x 4, 3 x 4 grids that mixed 
                    letters and numbers. 
                </div>
                <div className = 'visCont'>
                    <div className = 'visCol'>
                        <Visualization 
                            title = {'Bitcoin Price over Time'} 
                            xAxis = {'Days'} 
                            yAxis = {'Price in Dollars'} 
                            dataset = {dataset1} 
                            xMin = {0}
                            xMax = {21}
                            yMin = {0}
                            yMax = {1}
                            name = {'Vis1'}
                            description = {'This is a description of a graph this is a description of a graph'}/>
                    </div>
                    <div className = 'visCol'>
                        <Visualization 
                            title = {'Temperature Over Time'} 
                            xAxis = {'Days'} 
                            yAxis = {'Temperature in Fahrenheit'} 
                            dataset = {dataset2} 
                            xMin = {0}
                            xMax = {21}
                            yMin = {0}
                            yMax = {1}
                            name = {'Vis2'}
                            description = {'This is a description of a graph this is a description of a graph'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Visualizations