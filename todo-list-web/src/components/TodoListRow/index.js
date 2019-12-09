import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import validate from "validate.js";

import Radium from "radium";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { style } from "../TodoListRow/style"

class TodoListRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: false,
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.isSelected == props.isSelected && this.props.disabled == props.disabled ) {
            return;
        }
        this.setState({
            selected: props.isSelected,
            disabled: props.disabled
        })
    }

    onDeleteClicked = () => {
        if (!this.state.disabled) {
                validate.isFunction(this.props.onDelete) ? this.props.onDelete() : null
        }
    }

    onSelect = () => {
        if (!this.state.disabled) {
            this.props.onSelect()
        }
    }

    render() {
        let rowStyle = {
            ...style.row,
            backgroundColor: this.state.selected ? "#4f5359" : "transparent"
        }
        return (
            <Row 
                key={this.props.key}
                style={rowStyle}>
                <Col xs={10} 
                onClick={() => this.onSelect()}>
                    <div style={style.titleContainer}>
                        {this.props.todoList.name}
                    </div>
                </Col>
                <Col xs={2}>
                    <div style={style.deleteContainer} onClick={() => this.onDeleteClicked()}>
                        <FontAwesomeIcon icon={faMinus} style={style.deleteIcon}/>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Radium(TodoListRow);