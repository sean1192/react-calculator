import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Calculator.css';

class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        expression: "",
        entry: "0",
        result: ""
      };
      this.clear = this.clear.bind(this);
      this.equals = this.equals.bind(this);
      this.append = this.append.bind(this);
      this.operator = this.operator.bind(this);
    }

    componentDidMount() {
        document.body.style.backgroundColor = "#dddddd";
    }

    clear() {
        this.setState(state=>({
            expression: "",
            entry: "0",
            result: ""
        }))
    }
  
    equals() {
        
        let updatedResult = ""
        
        if(this.state.result === ""){
            try {
                updatedResult = eval(this.state.expression);
                if (updatedResult === undefined) {
                    updatedResult = "NAN";
                }
            } catch {
                updatedResult = "NAN";
            }
            this.setState(state=>({
                entry: updatedResult,
                result: updatedResult
            }))
            this.append("=".concat(updatedResult))
        }
    }

    append(value) {

        const operators = ["+", "-", "/", "*"]
        const firstChar = this.state.entry[0];
        const addToStatement = this.validateEntry(value, this.state.entry); 
        let updatedEntry = value
        
        // Update entry if an operator is entered
        // Update entry if there is a preceding zero
        if (operators.indexOf(value) === -1) {
            if (firstChar === "0") {
                updatedEntry = value       
            } else if (operators.indexOf(firstChar) !== -1) {
                updatedEntry = value
            } else {
                updatedEntry = this.state.entry + value
            }
        }

        // Append value to the string if it passes validation
        if (addToStatement & this.state.result === "") {
            this.setState(state=> ({
                expression: this.state.expression + value,
                entry: updatedEntry
            }))
        }   
    }

    operator(value) {
        const operators = ["+", "-", "/", "*"]
        const lastChar = this.state.expression.slice(-1);

        // Append the value of the last character in the expression if it isn't an operator
        if (operators.indexOf(lastChar) === -1 && this.state.result == "") {
            this.append(value)
        } 

        // Allow for operators to apply on the result
        else if (this.state.result.length != "") {
            this.setState(state=> ({
                expression: this.state.result + value,
                entry: value,
                result: ""
            }))
        }
        
        // Ignore negative sign when updating last char of expression
        else if (value !== "-") {
            // Update entry and last character of the expression
            const updatedExpression = this.state.expression.slice(0, -1) + value;

            this.setState(state=> ({
                expression: updatedExpression,
                entry: value
            }))
        } 
        
        // Allow a single negative value to be placed after operator
        else if (lastChar !== "-") {
            this.append(value)
        }
    }

    validateEntry(value, statement) {
        
        // Prevent multiple zeroes from being added to the beginning
        if (statement + value === "00") {
            return false
        }

        // Prevent multiple decimals from being added simultaneously
        if (statement.charAt(statement.length - 1) + value === "..") {
            return false
        }

        // Do not let multiple decimal points be added to one number
        if (value === "." & statement.includes(".")) {
            return false
        }

        else {
            return true
        }
    }
    
    render() {
      return (
        <div>

            <Container className="container">
                <div className="results">
                    <Row>
                        <Col><p className="expression">{this.state.expression}</p></Col>
                    </Row>

                    <Row>
                        <Col>
                        <p className="entry">
                            {(this.state.result.length != "") ? this.state.result : this.state.entry}
                        </p>
                        </Col>
                    </Row>
                </div>

                <Row className="no-gutters">
                    <Col xs={6}>
                        <Button 
                            id="clear"
                            className="smallButton btn-danger" 
                            onClick={this.clear}>
                                AC
                        </Button>
                    </Col>

                    <Col xs={3}>
                        <Button 
                            id="divide"
                            variant="contained" 
                            className="smallButton btn-secondary"
                            onClick={()=>this.operator("/")}>
                                /
                        </Button>
                    </Col>

                    <Col xs={3}>
                        <Button 
                            id="multiply"
                            variant="contained" 
                            className="smallButton btn-secondary"
                            onClick={()=>this.operator("*")}>
                                *
                        </Button>
                    </Col>
                </Row>
            
                <Row className="no-gutters">
                    <Col>
                        <Button 
                            id="seven"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("7")}>
                                7
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="eight"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("8")}>
                                8
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="nine"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("9")}>
                                9
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="subtract"
                            variant="contained" 
                            className="smallButton btn-secondary"
                            onClick={()=>this.operator("-")}>
                                -
                        </Button>
                    </Col>
                </Row>

                <Row className="no-gutters">
                    <Col>
                        <Button 
                            id="four"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("4")}>
                                4
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="five"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("5")}>
                                5
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="six"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("6")}>
                                6
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="add"
                            variant="contained" 
                            className="smallButton btn-secondary"
                            onClick={()=>this.operator("+")}>
                                +
                        </Button>
                    </Col>
                </Row>

                <Row className="no-gutters">
                    <Col>
                        <Button 
                            id="one"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("1")}>
                                1
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="two"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("2")}>
                                2
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="three"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("3")}>
                                3
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            id="equals"
                            className="tallButton btn-primary" 
                            onClick={this.equals}>
                                =
                        </Button>
                    </Col>
                </Row>

                <Row className="no-gutters"> 
                    <Col xs={6}>
                        <Button 
                            id="zero"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append("0")}>
                                0
                        </Button>
                    </Col>

                    <Col xs={3}>
                        <Button 
                            id="decimal"
                            variant="contained" 
                            className="smallButton btn-dark"
                            onClick={()=>this.append(".")}>
                                .
                        </Button>
                    </Col>
                </Row>
                
            </Container>

        </div>
      );
    }
  };
  
  export default Calculator