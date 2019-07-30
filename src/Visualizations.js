import React from 'react'
import * as d3 from 'd3'
import './Visualizations.css'
import Visualization from './Visualization';

class Visualizations extends React.Component {
    render() {
        let n = 21
        console.log(d3.range(n))
        let dataset1 = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)() } })
        console.log(dataset1)
        let dataset2 = d3.range(n).map(function(d) { return {'y': d3.randomUniform(1)() } })
        return (
            <div className = 'visCont'>
                <div className = 'visCol'>
                    <Visualization title = {'Bitcoin Price over Time'} xAxis = {'Days'} yAxis = {'Price in Dollars'} dataset = {dataset1} n = {21} name = {'Vis1'}></Visualization>
                    <Visualization title = {'Bitcoin Price over Time'} xAxis = {'Days'} yAxis = {'Price in Dollars'} dataset = {dataset1} n = {21} name = {'Vis3'}></Visualization>
                    <Visualization title = {'Bitcoin Price over Time'} xAxis = {'Days'} yAxis = {'Price in Dollars'} dataset = {dataset1} n = {21} name = {'Vis5'}></Visualization>
                </div>
                <div className = 'visCol'>
                    <Visualization title = {'Temperature Over Time'} xAxis = {'Days'} yAxis = {'Temperature in Fahrenheit'} dataset = {dataset2} n = {21} name = {'Vis2'}></Visualization>
                    <Visualization title = {'Temperature Over Time'} xAxis = {'Days'} yAxis = {'Temperature in Fahrenheit'} dataset = {dataset2} n = {21} name = {'Vis4'}></Visualization>
                    <Visualization title = {'Temperature Over Time'} xAxis = {'Days'} yAxis = {'Temperature in Fahrenheit'} dataset = {dataset2} n = {21} name = {'Vis6'}></Visualization>
                </div>
            </div>
        )
    }
}

export default Visualizations