import React, { Component } from "react";
import './calculator.css';

import Button from "../components/button/button";
import Display from "../components/display/display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0,
}

export default class Calculator extends Component {

    state = { ...initialState};

    constructor(props) {
        super(props);

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory() {
        this.setState({ ...initialState })
        console.log('limpar');
    }

    setOperation(operation) {
        console.log(operation)
        if (this.state.current === 0){
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            switch (currentOperation) {
                case "+":
                        values[0] = values[0] + values[1];
                        values[1] = 0
                    break;
                case "*":
                        values[0] = values[0] * values[1];
                        values[1] = 0
                    break;
                case "/":
                        values[0] = values[0] / values[1];
                        values[1] = 0
                    break;
                case "-":
                        values[0] = values[0] - values[1];
                        values[1] = 0
                    break;
                
                default:
                    values[0] = "error"

            }

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue;
        console.log(currentValue)
        const displayValue = currentValue + n;
        console.log(displayValue)
        this.setState({ displayValue, clearDisplay: false });

        if (n !== '.') {
            const i = this.state.current;
            const newValues = parseFloat(displayValue);
            const values = [...this.state.values]
            values[i] = newValues
            this.setState({ values: values })
            console.log(values)
        }
        
    }

    render() {

        return (<div className="calculator">
            <Display value={this.state.displayValue} />
            <Button label="AC" click={this.clearMemory} triple />
            <Button label="/" click={this.setOperation} operation />
            <Button label="7" click={this.addDigit} />
            <Button label="8" click={this.addDigit} />
            <Button label="9" click={this.addDigit} />
            <Button label="*" click={this.setOperation} operation />
            <Button label="4" click={this.addDigit} />
            <Button label="5" click={this.addDigit} />
            <Button label="6" click={this.addDigit} />
            <Button label="-" click={this.setOperation} operation />
            <Button label="1" click={this.addDigit} />
            <Button label="2" click={this.addDigit} />
            <Button label="3" click={this.addDigit} />
            <Button label="+" click={this.setOperation} operation />
            <Button label="0" click={this.addDigit} double />
            <Button label="." click={this.addDigit} />
            <Button label="=" click={this.setOperation} operation />

        </div>
        )
    }
}