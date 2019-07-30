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
                    <Link to = '/description' className = 'link'>Description</Link>
                    <Link to ='/'  className = 'link'>Start Experiment</Link>
                    <Link to ='/visualizations' className = 'link'>Results</Link>
                </div>
                <Route path = '/description' component={Description} />
                <Route exact path='/' component={SperlingWrapper} />
                <Route path='/visualizations' component = {Visualizations} />
            </Router>
        )
    }
}

export default App