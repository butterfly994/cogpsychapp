import React from 'react'
import Grid from './Grid.js'
import './Sperling.css'

class Sperling extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      started: false,
      sets: 1,
      trialInProgress: false,
      GInd: 0,
      trialsBeforeSwitch: -1,
      inputRequested: false,
      G: null,
      displayCross: true,
      lettersArr: []
    }
    
    this.gridTypes = [['SimpleSpace', 3, false], ['SimpleSpace', 4, false], 
    ['SimpleSpace', 5, false], ['SimpleSpace', 6, false], 
    ['SimpleSpace', 7, false], ['CloseSpace', 6, false], ['4x4x4', 12, true], 
    ['3x3', 6, false], ['4x4', 8, true], ['4x4', 8, false]]
    this.cons = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N',
      'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']

    this.handlePress = this.handlePress.bind(this)
    this.runTrial = this.runTrial.bind(this)
    this.requestInput = this.requestInput.bind(this)
  }

  componentDidMount(){
    document.addEventListener('keypress', this.handlePress)
  }

  calculateScore(inputs) {
      let score = 0
      for (let i = 0; i < inputs.length; i++) {
          if (inputs[i] === this.state.lettersArr[i]) score++
      }
      return score
  }

  chooseLorN() {
      let letterOrNumber = Math.random()
      if (letterOrNumber < 0.5) {
          return (Math.floor(Math.random() * 10) + '')
      } else {
          let index = Math.floor(Math.random() * (this.cons.length - 1))
          return this.cons[index]
      }
  }

  chooseL() {
      let index = Math.floor(Math.random() * (this.cons.length - 1))
      return this.cons[index]
  }

  generateInputsArray(len, numbersPresent) {
      let letters = []
      for (let i = 0; i < len; i++) {
          if (numbersPresent) letters.push(this.chooseLorN())
          else letters.push(this.chooseL())
      }
      return letters
  }


  handlePress() {
    if(!this.state.started) return
    if (this.state.inputRequested) {
        let inputs = document.getElementsByTagName('input')
        inputs = Object.values(inputs)
        inputs = inputs.map((x => x.value))
        if (!inputs.some(x => (x === ''))) {
            //replace this line with DB storage in future
            console.log(this.calculateScore(inputs))
            this.setState({trialInProgress: false, displayCross: true, inputRequested: false})
        }
    } 
    else {
      this.startTrial()
    }

  }

  startTrial() {
      window.setTimeout(this.runTrial, 500)
  }

   requestInput() {
      this.setState({trialsBeforeSwitch: this.state.trialsBeforeSwitch - 1, inputRequested: true})
  }


   runTrial() {
      if (this.state.trialsBeforeSwitch <= 0) {
        this.setState({sets: this.state.sets - 1})
        if (this.state.sets < 0) {
            return
        }

        let gridTypesExcl = Array.from(this.gridTypes)

        if (this.state.trialsBeforeSwitch >= 0) {
            gridTypesExcl.splice(this.state.GInd, 1)
        }

        let newInd = Math.floor(Math.random() * (gridTypesExcl.length - 1))
        let newG = gridTypesExcl[newInd]
        let newtrialsBeforeSwitch = Math.floor(Math.random() * 15) + 5

        this.setState({GInd: newInd, G: newG, trialsBeforeSwitch: newtrialsBeforeSwitch})
      }
      this.setState({displayCross: false, trialInProgress: true, lettersArr: this.generateInputsArray(this.state.G[1], this.state.G[2])})
      console.log(this.state.lettersArr)
      window.setTimeout(this.requestInput, this.props.exposureDuration)
  }

  render(){ 
    let toRender
    if(this.state.sets < 0){
      toRender = 
      (
        <div className = 'App'>
          <div id='instructionText'>You have completed the experiment.</div>
        </div>
      )
    }
    else if(!this.state.started){
      toRender = 
        (
          <div className='App'>
            <div id='instructionText'>
                When you are ready to begin, press the Start button below. At the start of each trial, a cross will
                appear in the center of the screen. Make sure it is clearly in focus before pressing any key to begin.
                After a delay, an arrangement of letters and/or numbers will flash briefly on the screen. A response grid
                will then appear, matching the arrangement, where you are to write the letter you saw in the corresponding
                position on the grid. Any circular symbol is always the number zero and not the letter 'O'. If you cannot
                recall some letters/numbers, please guess to the best of your ability. This is a test of your ability to
                read letters under these conditions, not a test of your memory. When guessing, do not fill in the same
                letter consecutively, but guess different letters. When you have finished filling in your responses, press
                any key to submit them.
            </div>
            <div id='startBtn' onClick = {() => this.setState({started: true, trialInProgress: false})}>Start</div>
          </div>
        )
    }
    else if(this.state.started && this.state.displayCross){
      toRender = 
      (
        <div className = 'App'>
          <div id = 'cross'>+</div>
        </div>
      )
    }
    else{
      toRender =  (
        <div className="App">
        <Grid 
        str =  {this.state.G[0]}
        lettersArr = {this.state.lettersArr}
        isResponse = {this.state.inputRequested} />
        </div>
      )
    }
    return toRender
  }
}

export default Sperling;
