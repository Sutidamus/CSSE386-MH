import React from 'react';
import * as d3 from "d3";

class TestPlot extends React.Component {
    constructor(props){
        super(props)
        this.medi = d3.median([1,2,5,10,59,15901,5812])
    }

    render() {
        return <h1>My Median is {this.medi}</h1>;
    }
    
}

export default TestPlot;