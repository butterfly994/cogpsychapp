import React from 'react'
import './Grid.css'

class Grid extends React.Component {
        makeLetters() {
            let gridSpaces = []
            for (let i = 0; i < this.props.lettersArr.length; i++) {
                gridSpaces.push( <div className = 'grid-space' key = {i + ''}>{this.props.lettersArr[i]}</div>)
            }
            return gridSpaces
        }
        
        makeInputs() {
            let inputs = []
            for (let i = 0; i < this.props.lettersArr.length; i++) {
                inputs.push( <input maxLength = '1' key = {i + ''}/>)
            }
            return inputs
        }



        render() {
            let toReturn;
            if(this.props.isResponse){
                toReturn = <div id = {`grid${this.props.str}`}>{this.makeInputs()}</div>
            }
            else{
                toReturn = <div id = {`grid${this.props.str}`}>{this.makeLetters()}</div>
            }
            return toReturn
        }

}

export default Grid