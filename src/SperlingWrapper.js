import React from 'react'
import Sperling from './Sperling.js'
import './SperlingWrapper.css'
import {
    Howl,
    Howler
} from 'howler'

class SperlingWrapper extends React.Component {
    constructor() {
        super()

        this.state = {
            started: false,
            isPartial: false,
            exposureDuration: 50,
            toneDelay: 0
        }

        this.allGridTypes = [
            ['SimpleSpace', 3, false],
            ['SimpleSpace', 4, false],
            ['SimpleSpace', 5, false],
            ['SimpleSpace', 6, false],
            ['SimpleSpace', 7, false],
            ['CloseSpace', 6, false],
            ['4x4x4', 12, true],
            ['3x3', 6, false],
            ['4x4', 8, true],
            ['4x4', 8, false],
            ['3x3x3', 9, false]
        ]
        this.partialReport = [
            ['3x3', 6, false, 3],
            ['4x4', 8, false, 4],
            ['4x4', 8, true, 4],
            ['3x3x3', 9, false, 3],
            ['4x4x4', 12, true, 4]
        ]
        this.exposureDurations = [15, 50, 150, 500]
        this.toneDelays = [-100, 0, 150, 300, 500, 1000]

        Howler.volume(0.25)
        this.low = new Howl({
            src: ['low.wav'],
            sprite: {
                dur1: [0, 1000],
                durShort: [0, 250]
            }
        })
        this.medium = new Howl({
            src: ['medium.wav'],
            sprite: {
                dur1: [0, 1000],
                durShort: [0, 250]
            }
        })
        this.high = new Howl({
            src: ['high.wav'],
            sprite: {
                dur1: [0, 1000],
                durShort: [0, 250]
            }
        })
    }

    componentDidMount() {
        let isP = Math.floor(Math.random() * 2)
        isP = 1
        if (isP === 1) {
            let toneDelayIdx = Math.floor(Math.random() * this.toneDelays.length)
            toneDelayIdx = 0
            this.setState({
                isPartial: true,
                toneDelay: this.toneDelays[toneDelayIdx]
            })
        } else {
            let exposureIdx = Math.floor(Math.random() * this.exposureDurations.length)
            this.setState({
                exposureDuration: this.exposureDurations[exposureIdx]
            })
        }
    }

    render() {
        let stockPhrase;
        if (!this.state.started && this.state.isPartial) {
            if (this.state.toneDelay === 0) {
                stockPhrase = 'Simultaneously'
            } else if (this.state.toneDelay < 0) {
                stockPhrase = 'Shortly before the arrangement of letters appears'
            } else {
                stockPhrase = 'Shortly after'
            }
        }

        let toRender
        if (!this.state.started && !this.state.isPartial) {
            toRender =
                ( 
                    <div className = 'App' >
                        <div id = 'instructionText' >
                        When you are ready to begin, press the Start button below. At the start of each trial, a cross will appear in the 
                        center of the screen. Make sure it is clearly in focus before pressing any key to begin. After a delay, an 
                        arrangement of letters and/or numbers will flash briefly on the screen. A response grid will then appear, matching 
                        the arrangement, where you are to write the letter you saw in the corresponding position on the grid. Any circular 
                        symbol is always the number zero and not the letter 'O'. If you cannot recall some letters/numbers, please guess 
                        to the best of your ability. This is a test of your ability to read letters under these conditions, not a test of 
                        your memory. When guessing, do not fill in the same letter consecutively, but guess different letters. When you 
                        have finished filling in your responses, press any key to submit them. 
                        </div> 
                        <div id = 'startBtn'
                        onClick = {
                            () => this.setState({
                                started: true,
                                trialInProgress: false
                            })
                        }>Start</div> 
                    </div>
                )
        } else if (!this.state.started && this.state.isPartial) {
            toRender =
                ( 
                    <div className = 'App' >
                        <div id = 'instructionText' > {
                            `When you are ready to begin, press the Start button below. At the start of each trial, a cross will
                            appear in the center of the screen. Make sure it is clearly in focus before pressing any key to begin.
                            After a delay, an arrangement of letters and/or numbers will flash briefly on the screen. ${stockPhrase}, 
                            a tone will play. A response grid will then appear, matching the arrangement. If the tone played was 
                            high, fill in the first row of the response grid only. If the tone played was low, fill in the last row 
                            of the response grid only. If the grid that appeared had 3 rows, and the tone played was medium, fill in
                            the middle row only. Any circular symbol is always the number zero and not the letter 'O'. If you cannot
                            recall some letters/numbers, please guess to the best of your ability. This is a test of your ability to
                            read letters under these conditions, not a test of your memory. When guessing, do not fill in the same
                            letter consecutively, but guess different letters. When you have finished filling in your responses, press
                            any key to submit them. Click on the labelled buttons below to listen to the different tones.`
                        } </div> 
                        <div className = 'buttonArr' >
                            <div className = 'button'
                            onClick = {
                                () => this.low.play('durShort')
                            }>Low</div> 
                            <div className = 'button'
                            onClick = {
                                () => this.medium.play('durShort')
                            }>Medium</div> 
                            <div className = 'button'
                            onClick = {
                                () => this.high.play('durShort')
                            }>High</div> 
                        </div> 
                        <div id = 'startBtn'
                        onClick = {
                            () => this.setState({
                                started: true,
                                trialInProgress: false
                            })
                        }>Start</div> 
                    </div>
                )
        } else {
            let gridTypes;
            if (this.state.isPartial) {
                gridTypes = this.partialReport
            } else {
                gridTypes = this.allGridTypes
            }

            toRender =
                ( 
                    <div className = 'App'>
                        <Sperling exposureDuration = {
                            this.state.exposureDuration
                        }
                        availableGridTypes = {
                            gridTypes
                        }
                        sets = {
                            5
                        }
                        isPartial = {
                            this.state.isPartial
                        }
                        toneDelay = {
                            this.state.toneDelay
                        }
                        low = {
                            this.low
                        }
                        medium = {
                            this.medium
                        }
                        high = {
                            this.high
                        }
                        />
                    </div>
                )
        }
        return toRender
    }
}

export default SperlingWrapper