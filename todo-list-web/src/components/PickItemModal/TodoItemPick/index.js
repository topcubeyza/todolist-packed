import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import validate from "validate.js";
import moment from "moment";

import Radium from "radium";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import { style } from "../TodoItemPick/style"

class TodoItemPick extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: false,
        }
    }

    componentWillReceiveProps(props) {
        if (this.props.isSelected == props.isSelected) {
            return;
        }
        this.setState({
            selected: props.isSelected,
        })
    }

    onSelect = () => {
        this.props.onSelect()
    }

    onDelete = (e) => {
        e.stopPropagation()
        this.props.onDelete()
    }

    render() {
        if (this.props.todoItem == null) {
            return null;
        }
        let rowStyle = {
            ...style.row,
            backgroundColor: this.state.selected ? (this.props.dark ? "#4f5359" : "lightgrey") : style.row.backgroundColor,
        }
        let iconColor = this.props.todoItem.status ? "#83ff4d" : "grey"
        let iconStyle = {
            ...style.icon,
            color: iconColor
        }
        return (
            <Row
                key={this.props.todoItem.id}
                style={rowStyle}>

                <div style={style.hover}>
                    <Col onClick={() => this.onSelect()} style={style.containerColumn}>
                        <Row>
                            <Col xs={2}>
                                <div style={style.iconContainer}>
                                    <FontAwesomeIcon icon={faCheck} style={iconStyle} />
                                </div>
                            </Col>
                            <Col xs={8}>
                                <div style={this.props.dark ? style.nameContainerDark : style.nameContainerLight}>
                                    {this.props.todoItem.name}
                                </div>
                            </Col>
                            {
                                this.props.showDelete ?
                                    <Col xs={2}>
                                        <div style={style.deleteContainer} onClick={(e) => this.onDelete(e)}>
                                            <FontAwesomeIcon icon={faMinus} style={style.deleteIcon} />
                                        </div>
                                    </Col>
                                    :
                                    null
                            }
                        </Row>
                    </Col>
                </div>
            </Row>
        );
    }
}

export default Radium(TodoItemPick);