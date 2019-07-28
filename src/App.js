import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SperlingWrapper from './SperlingWrapper.js'
import Visualizations from './Visualizations.js'
import Description from './Description.js'
import './App.css'

class App extends React.Component{
    render(){
        return (
            <Router>
                <div className = 'nav'>
                    <Link to = '/' className = 'link'>Description</Link>
                    <Link to ='/experiment'  className = 'link'>Start Experiment</Link>
                    <Link to ='/visualizations' className = 'link'>Results</Link>
                </div>
                <Route exact path = '/' component={Description} />
                <Route path='/experiment' component={SperlingWrapper} />
                <Route path='/visualizations' component = {Visualizations} />
            </Router>
        )
    }
}

export default App