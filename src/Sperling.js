import React from 'react'
import Grid from './Grid.js'
import {
  Howler
} from 'howler'
import {Auth, API, graphqlOperation } from 'aws-amplify';

const addWholeReport = `mutation createWholeReport($exposureDuration:Float! $numLetters: Int! $containsNumbers: Boolean! $gridName: String! $lettersCorrect: Int! $userId: String!) {
  createWholeReport(input:{
    exposureDuration:$exposureDuration
    numLetters:$numLetters
    containsNumbers:$containsNumbers
    gridName:$gridName
    lettersCorrect:$lettersCorrect
    userId:$userId
  }){
    id
    exposureDuration
    numLetters
    containsNumbers
    gridName
    lettersCorrect
    userId
  }
}`
const addPartialReport = `mutation createPartialReport($toneLevel:Int! $numLetters: Int! $containsNumbers: Boolean! $gridName: String! $toneDelay: Float! $accuracy: Float! $userId: String!) {
  createPartialReport(input:{
    toneLevel:$toneLevel
    numLetters:$numLetters
    containsNumbers:$containsNumbers
    gridName:$gridName
    toneDelay:$toneDelay
    accuracy:$accuracy
    userId:$userId
  }){
    id
    toneLevel
    numLetters
    containsNumbers
    gridName
    toneDelay
    accuracy
    userId
  }
}`

class Sperling extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sets: this.props.sets,
      trialInProgress: false,
      GInd: 0,
      trialsBeforeSwitch: -1,
      inputRequested: false,
      G: null,
      displayCross: true,
      lettersArr: [],
      partialRowNum: -1
    }

    this.cons = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N',
      'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'
    ]
    Howler.volume(0.25)

    this.handlePress = this.handlePress.bind(this)
    this.runTrial = this.runTrial.bind(this)
    this.requestInput = this.requestInput.bind(this)
    this.playTone = this.playTone.bind(this)
  }

  componentDidMount() {
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
      let index = Math.floor(Math.random() * this.cons.length)
      return this.cons[index]
    }
  }

  chooseL() {
    let index = Math.floor(Math.random() * this.cons.length)
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

  getCheckInputsFunc() {
    if (this.state.partialRowNum < 0) return ((i) => {
      return true
    })
    else {
      return (
        (i) => {
          return (i >= this.state.G[3] * this.state.partialRowNum &&
            i < this.state.G[3] * (this.state.partialRowNum + 1))
        }
      )
    }
  }


  handlePress() {
    if (this.state.inputRequested) {
      let inputs = document.getElementsByTagName('input')
      inputs = Object.values(inputs)
      inputs = inputs.map((x => x.value))

      if (!this.props.isPartial && !inputs.some(x => (x === ''))) {
          Auth.currentUserCredentials()
            .then(userCreds =>  
              {
                this.wholeReportMutation(this.props.exposureDuration, this.state.G[1], 
                  this.state.G[2], this.state.G[0], this.calculateScore(inputs), userCreds.identityId)
              })
            .catch(err => console.log(err))
       
        this.setState({
          trialInProgress: false,
          displayCross: true,
          inputRequested: false
        })
      } else if (this.props.isPartial) {
        let count = inputs.reduce((sum, curr) => {
          if (curr !== '') return sum + 1
          else return sum
        }, 0)

        if (count === this.state.G[3]) {
          Auth.currentUserCredentials()
            .then(userCreds =>  
              {
                this.partialReportMutation(this.state.partialRowNum, this.state.G[1], 
                  this.state.G[2], this.state.G[0], this.props.toneDelay, 
                  this.calculateScore(inputs)/this.state.G[3], userCreds.identityId)
              })
            .catch(err => console.log(err))

          this.setState({
            trialInProgress: false,
            displayCross: true,
            inputRequested: false
          })
        }
      }
    } else {
      this.startTrial()
    }

  }

  startTrial() {
    window.setTimeout(this.runTrial, 500)
  }

  requestInput() {
    this.setState({
      trialsBeforeSwitch: this.state.trialsBeforeSwitch - 1,
      inputRequested: true
    })
  }


  runTrial() {
    if (this.state.trialsBeforeSwitch <= 0) {
      this.setState({
        sets: this.state.sets - 1
      })
      if (this.state.sets < 0) {
        return
      }

      let gridTypesExcl = Array.from(this.props.availableGridTypes)
      if (this.props.sets - this.state.sets <= 2 && this.props.isPartial) {
        gridTypesExcl = gridTypesExcl.slice(0, 3)
      }

      if (this.state.trialsBeforeSwitch >= 0) {
        gridTypesExcl.splice(this.state.GInd, 1)
      }

      let newInd = Math.floor(Math.random() * gridTypesExcl.length)
      let newG = gridTypesExcl[newInd]
      let newtrialsBeforeSwitch = Math.floor(Math.random() * 16) + 5

      this.setState({
        GInd: newInd,
        G: newG,
        trialsBeforeSwitch: newtrialsBeforeSwitch
      })
    }
    if (this.props.toneDelay < 0 && this.props.isPartial) {
      this.playTone()
      window.setTimeout(
        () => {
          this.setState({
            displayCross: false,
            trialInProgress: true,
            lettersArr: this.generateInputsArray(this.state.G[1], this.state.G[2])
          })
          window.setTimeout(this.requestInput, this.props.exposureDuration)
        },
        this.props.toneDelay * -1)
    } else if (this.props.toneDelay >= 0 && this.props.isPartial) {
      this.setState({
        displayCross: false,
        trialInProgress: true,
        lettersArr: this.generateInputsArray(this.state.G[1], this.state.G[2])
      })
      if (this.props.exposureDuration < this.props.toneDelay) {
        window.setTimeout(
          () => {
            this.requestInput()
            window.setTimeout(this.playTone, this.props.toneDelay - this.props.exposureDuration)
          }, this.props.exposureDuration)
      } else {
        window.setTimeout(
          () => {
            this.playTone()
            window.setTimeout(this.requestInput, this.toneDelay - this.props.exposureDuration)
          }, this.props.toneDelay)
      }
    } else {
      this.setState({
        displayCross: false,
        trialInProgress: true,
        lettersArr: this.generateInputsArray(this.state.G[1], this.state.G[2])
      })
      window.setTimeout(this.requestInput, this.props.exposureDuration)
    }
  }

  playTone() {
    if (this.props.isPartial) {
      let rowNum
      if (this.state.G[1] / this.state.G[3] === 3) {
        rowNum = Math.floor(Math.random() * 3)
        if (rowNum === 0) {
          this.props.high.play('dur1')
        } else if (rowNum === 1) {
          this.props.medium.play('dur1')
        } else {
          this.props.low.play('dur1')
        }
      } else {
        rowNum = Math.floor(Math.random() * 2)
        if (rowNum === 0) {
          this.props.high.play('dur1')
        } else {
          this.props.low.play('dur1')
        }
      }
      this.setState({
        partialRowNum: rowNum
      })
    }
  }
  
  wholeReportMutation = async (exposureDuration, numLetters, containsNumbers, gridName, lettersCorrect, userId) => {
    const trialDetails = {
      exposureDuration: exposureDuration,
      numLetters: numLetters,
      containsNumbers: containsNumbers,
      gridName: gridName,
      lettersCorrect: lettersCorrect,
      userId: userId
    };
    
    await API.graphql(graphqlOperation(addWholeReport, trialDetails));
  }

  partialReportMutation = async (toneLevel, numLetters, containsNumbers, gridName, toneDelay, accuracy, userId) => {
    const trialDetails = {
      toneLevel: toneLevel,
      numLetters: numLetters,
      containsNumbers: containsNumbers,
      gridName: gridName,
      toneDelay: toneDelay,
      accuracy: accuracy,
      userId: userId
    };
    
    await API.graphql(graphqlOperation(addPartialReport, trialDetails));
  }

  render() {
    let toRender
    if (this.state.sets < 0) {
      toRender =
        ( 
          <div className = 'instructionWrapper'>
            <div id = 'instructionText'>You have completed the experiment.</div> 
          </div>
        )
    } else if (this.state.displayCross) {
      toRender =
        ( 
          <div id = 'cross'>+</div> 
          
        )
    } else {
      toRender = ( 
        <Grid 
          str = {
            this.state.G[0]
          }
          lettersArr = {
            this.state.lettersArr
          }
          isResponse = {
            this.state.inputRequested
          }
          checkInputsFunc = {
            this.getCheckInputsFunc()
          }/> 
      )
    }
    return toRender
  }
}

export default Sperling;