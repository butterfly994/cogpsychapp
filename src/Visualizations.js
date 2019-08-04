import React from 'react'
import './Visualizations.css'
import Visualization from './Visualization';
import {API, graphqlOperation } from 'aws-amplify';


class Visualizations extends React.Component {

    constructor(){
        super()
        this.state = {
            channelCapacityData: null,
            expDurData: null,
            toneDelayData3x3x3: null,
            toneDelayData4x4x4: null,
            toneDelayData4x4: null,
            toneDelayInd0: null,
            toneDelayInd1: null,
            toneDelayInd2: null,
            toneDelayInd3: null,
            toneDelayInd4: null,
            toneDelayInd5: null
        }
        this.fetchData = this.fetchData.bind(this)

        //get data for number of letters available versus letters correctly reported
        let letters = [3,4,5,6,7,8,9,12]
        this.fetchData(letters, (d) => [{name: 'numLetters', value: d}, {name: 'exposureDuration', value: 50}], false, (x) => x, (y) => y, 'channelCapacityData', (j) => 6)

        //get data for exposure duration versus letters correctly reported
        let exposureDurations = [15, 50, 150, 500]
        this.fetchData(exposureDurations, (d) => [{name: 'exposureDuration', value: d}, {name: 'gridName', value: '"3x3"'}], false, (x) => x/1000, (y) => y, 'expDurData', (j) => 0)

        //get data for tone delay versus accuracy for 3x3x3 grid
        let toneDelays = [-100, 0, 150, 300, 500, 1000]
        this.fetchData(toneDelays, (d) => [{name: 'toneDelay', value: d}, {name: 'gridName', value: '"3x3x3"'}], true, (x) => x/1000, (y) => y*100, 'toneDelayData3x3x3', (j) => 5)

        //get data for tone delay versus accuracy for 4x4x4 grid
        this.fetchData(toneDelays, (d) => [{name: 'toneDelay', value: d}, {name: 'gridName', value: '"4x4x4"'}], true, (x) => x/1000, (y) => y*100, 'toneDelayData4x4x4', (j) => 3)

        //get  data for the tone delay versus accuray for the 4x4 grid
        this.fetchData(toneDelays, (d) => [{name: 'toneDelay', value: d}, {name: 'gridName', value: '"4x4"'}, {name: 'containsNumbers', value: false}], true, (x) => x/1000, (y) => y*100, 'toneDelayData4x4', (j) => 0)


        //get data for the big graph

        for(let i = 0; i < toneDelays.length; i++){
            let paramsfunc = (d) => {
                let gridName
                if(d === 3 || d === 4 || d === 5 || d === 7){
                    gridName = '"simpleSpace"'
                }
                else if(d === 6){
                    gridName = '"3x3"'
                }
                else if(d === 9){
                    gridName = '"3x3x3"'
                }
                else{
                    gridName = '"4x4x4"'
                }
                return [{name: 'toneDelay', value: toneDelays[i]}, {name: 'gridName', value: gridName}]
            } 
            let pointTypeFunc = (j) => {
                let pointType
                if(j === 0 || j === 1 || j === 2 || j === 4){
                    pointType = 6
                }
                else if(j === 4 || j === 5){
                    pointType = 0
                }
                else if(j === 6){
                    pointType = 5
                }
                else{
                    pointType = 3
                }
                return pointType
            }
            this.fetchData(letters, paramsfunc, true, (x) => x, (y) => y*100, `toneDelayInd${i}`, pointTypeFunc)
        }
        
    }

    fetchData(xs, computeParams, isPartial, transformXFn, transformYFn, updateName, pointTypeFunc){
        let dataset = xs.map((d) => {
            return this.listReportQuery(computeParams(d), isPartial)
        })
        Promise.all(dataset)
            .then((values) => {
                if(!values.some((val) => {return val.length === 0})){
                    this.setState({[updateName]: values.map((arr, i) => { return {'y': transformXFn(this.getAverage(arr)), 'x': transformYFn(xs[i]), 'pointType': pointTypeFunc(i)}})})
                }
            })
    }

    getReportQueryByParam(params, isPartial){
        let filterExp = ''
        for(let i = 0; i < params.length - 1; i++){
            filterExp += `${params[i].name}: {eq: ${params[i].value}}, `
        }
        filterExp += `${params[params.length - 1].name}: {eq: ${params[params.length - 1].value}}`

        let queryMethodName
        if(isPartial){
            queryMethodName = 'listPartialReports'
        }
        else{
            queryMethodName = 'listWholeReports'
        }

        let dataToRetrieve
        if(isPartial){
            dataToRetrieve = 'accuracy'
        }
        else{
            dataToRetrieve = 'lettersCorrect'
        }

        return `query {
            ${queryMethodName}(filter: {${filterExp}} limit: ${500000}){
                items
                {
                    ${dataToRetrieve}
                }
            }
        }`
    }

    listReportQuery = async (params, isPartial) => {
        const all = await API.graphql(graphqlOperation(this.getReportQueryByParam(params, isPartial)))
        if(isPartial){
            return all.data.listPartialReports.items
        }
        else{
            return all.data.listWholeReports.items
        }
    }


    getAverage(items){
        return items.reduce((previousValue, currentValue) => {return previousValue + currentValue.lettersCorrect}, 0) / items.length
    }


    render() {
        let straightLineData = [{'x': 3, 'y': 3, 'pointType': -1}, {'x': 12, 'y': 12, 'pointType': -1}]

        let dataChannelCapacity = 
        [
            {
                dataset: this.state.channelCapacityData,
                lineColor: 'navy',
                pointColor: '#ffab00',
                noSymbols: true
            },
            {
                dataset: straightLineData,
                lineColor: 'navy',
                pointColor: '#ffab00',
                noSymbols: true
            }
        ]

        let dataExpDur = 
        [
            {
                dataset: this.state.expDurData,
                lineColor: 'navy',
                pointColor: '#ffab00',
                noSymbols: false
            }
        ]

        let dataToneDelay3x3x3 = 
        [
            {
                dataset: this.state.toneDelayData3x3x3,
                lineColor: 'navy',
                pointColor: '#ffab00',
                noSymbols: false
            }
        ]
        let dataToneDelay4x4x4 = 
        [
            {
                dataset: this.state.toneDelayData4x4x4,
                lineColor: 'navy',
                pointColor: '#ffab00',
                noSymbols: false
            }
        ]
        let dataToneDelay4x4 = 
        [
            {
                dataset: this.state.toneDelayData4x4,
                lineColor: 'navy',
                pointColor: '#ffab00',
                noSymbols: false
            }
        ]
        let summaryGraphData = 
        [
            {
                dataset: straightLineData,
                lineColor: 'black',
                pointColor: '#ffab00',
                noSymbols: true
            },
            {
                dataset: this.state.toneDelayInd0,
                lineColor: 'blue',
                pointColor: 'black',
                noSymbols: false
            },
            {
                dataset: this.state.toneDelayInd1,
                lineColor: 'purple',
                pointColor: 'black',
                noSymbols: false
            },
            {
                dataset: this.state.toneDelayInd2,
                lineColor: 'green',
                pointColor: 'black',
                noSymbols: false
            },
            {
                dataset: this.state.toneDelayInd3,
                lineColor: '#ffab00',
                pointColor: 'black',
                noSymbols: false
            },
            {
                dataset: this.state.toneDelayInd4,
                lineColor: 'red',
                pointColor: 'black',
                noSymbols: false
            },
            {
                dataset: this.state.toneDelayInd5,
                lineColor: 'brown',
                pointColor: 'black',
                noSymbols: false
            }
        ]
        
        return (
            <div>
                <div className = 'paragraph'>
                    The code for symbols: x - inputs with letters all on one line, 
                    + - input with six letters closely spaced, o - 2 x 3, 2 x 4, 2 x 5 
                    grids, square - 3 x 3 grid, triangle - 2 x 4, 3 x 4 grids that mixed 
                    letters and numbers. All data is over the average of all participants.
                </div>
                <div className = 'visCont'>
                    <div className = 'visCol'>
                    {this.state.channelCapacityData &&
                        <Visualization 
                            title = {'Channel Capacity Curves'} 
                            xAxis = {'Number of Letters in Stimulus'} 
                            yAxis = {'Letters Correctly Reported'} 
                            data = {dataChannelCapacity}
                            xMin = {3}
                            xMax = {12}
                            yMin = {0}
                            yMax = {12}
                            name = {'Vis1'}
                            description = {'Lower curve: immediate memory as per the experiment. Diagonal line: the maximum possible score (input equals output). All trials included in the graph are exclusively with a 50 millisecond exposure duration.'}/>
                    }
                    {this.state.toneDelayData4x4 &&
                        <Visualization 
                            title = {'Decay of Available Information: 8 Letters (4x4)'} 
                            xAxis = {'Delay of Instruction Tone (Sec.)'} 
                            yAxis = {'Per Cent Correct'} 
                            data = {dataToneDelay4x4}
                            xMin = {-0.1}
                            xMax = {1}
                            yMin = {0}
                            yMax = {100}
                            name = {'Vis5'}
                            description = {''}/>
                    }
                    {this.state.toneDelayData3x3x3 &&
                        <Visualization 
                            title = {'Decay of Available Information: 9 Letters (3x3x3)'} 
                            xAxis = {'Delay of Instruction Tone (Sec.)'} 
                            yAxis = {'Per Cent Correct'} 
                            data = {dataToneDelay3x3x3}
                            xMin = {-0.1}
                            xMax = {1}
                            yMin = {0}
                            yMax = {100}
                            name = {'Vis3'}
                            description = {''}/>
                    }
                    </div>
                    <div className = 'visCol'>
                    {this.state.expDurData &&
                        <Visualization 
                            title = {'Exposure Duration versus Letters Correctly Reported'} 
                            xAxis = {'Exposure Duration (Sec.)'} 
                            yAxis = {'Letters Correctly Reported'} 
                            data = {dataExpDur}
                            xMin = {0}
                            xMax = {0.5}
                            yMin = {0}
                            yMax = {12}
                            noSymbols = {false}
                            name = {'Vis2'}
                            description = {`Stimulus used were 2x3 grids. The main result is that exposure duration, even over a wide range, is not an important parameter in determining the number of letters a subject can recall correctly.`}/>
                    }
                    {this.state.toneDelayData4x4x4 &&
                        <Visualization 
                            title = {'Decay of Available Information: 12 Letters (4x4x4)'} 
                            xAxis = {'Delay of Instruction Tone (Sec.)'} 
                            yAxis = {'Per Cent Correct'} 
                            data = {dataToneDelay4x4x4}
                            xMin = {-0.1}
                            xMax = {1}
                            yMin = {0}
                            yMax = {100}
                            name = {'Vis4'}
                            description = {''}/>
                    }
                    {this.state.toneDelayInd0 && this.state.toneDelayInd1 && this.state.toneDelayInd2 && this.state.toneDelayInd3 && this.state.toneDelayInd4 && this.state.toneDelayInd5 &&
                        <Visualization 
                            title = {'Summary of Partial Report Results'} 
                            xAxis = {'Number of Letters in Stimulus'} 
                            yAxis = {'Per Cent Correct'} 
                            data = {summaryGraphData}
                            xMin = {3}
                            xMax = {12}
                            yMin = {0}
                            yMax = {100}
                            name = {'Vis6'} 
                            description = {'Diagonal black line: the maximum possible score (input equals output). Blue line represents -.100 sec. delay in instruction tone, purple 0 sec. delay in instruction tone, green .150 sec. delay in instruction tone, orange .300 sec. delay in instruction tone, red .500 sec. delay in instruction tone, brown 1.00 sec. delay in instruction tone.'}/>
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Visualizations