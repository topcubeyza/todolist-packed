import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import validate from "validate.js";
import moment from "moment";

import Radium from "radium";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { style } from "../TodoItemRow/style"

class TodoItemRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: false,
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.isSelected == props.isSelected && this.props.disabled == props.disabled) {
            return;
        }
        this.setState({
            selected: props.isSelected,
            disabled: props.disabled
        })
    }

    onEditClicked = (event) => {
    }

    onSelect = () => {
        if (!this.state.disabled) {
            this.props.onSelect()
        }
    }

    render() {
        if (this.props.todoItem == null) {
            return null;
        }
        let borderColor;
        if (this.props.todoItem.status) {
            borderColor = "#83ff4d"
        } else if (this.props.todoItem.expired) {
            borderColor = "red"
        } else {
            borderColor = "grey"
        }
        let rowStyle = {
            ...style.row,
            backgroundColor: this.state.selected ? "#4f5359" : style.row.backgroundColor,
            borderRight: "3px solid " + borderColor
        }
        return (
            <Row
                key={this.props.key}
                style={rowStyle}>

                <div style={style.hover}>
                    <Col onClick={() => this.onSelect()} style={style.containerColumn}>
                        <Row>
                            <Col xs={10}>
                                <div style={style.nameContainer}>
                                    {this.props.todoItem.name}
                                </div>
                            </Col>

                            <Col xs={2}>
                                <div style={style.iconContainer} onClick={(event) => this.onEditClicked(event)}>
                                    <FontAwesomeIcon icon={faPen} style={style.icon}  />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={style.deadlineContainer}>
                                    Due {this.props.todoItem.deadline}
                                </div>
                            </Col>
                            <Col style={style.createdOnColumn}>
                                <div style={style.createdOnContainer}>
                                    Created@{this.props.todoItem.createdOn}
                                </div>
                            </Col>

                        </Row>
                    </Col>
                </div>
            </Row>
        );
    }
}

export default Radium(TodoItemRow);