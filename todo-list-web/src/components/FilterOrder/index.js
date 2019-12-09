import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { filterAndOrder, clearFiltersOrders } from "../../actions/filter_order_action"
import validate from "validate.js";

import Radium from "radium"
import { Container, Col, Form, Button, Row, Modal } from "react-bootstrap";
import { style } from "../FilterOrder/style"

class FilterOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statusFilter: null,
            expiredFilter: null,
            nameFilter: "",
            orderType: null,
            orderDirection: true
        }
    }

    componentDidMount = () => {
    }

    componentWillReceiveProps(props) {
        this.setState({
            statusFilter: null,
            expiredFilter: null,
            nameFilter: "",
            orderType: null,
            orderDirection: true
        })
    }

    formObject = () => {
        let filters = [];
        let orderId = null;
        if (this.state.statusFilter != null) {
            filters.push({ id: "st", value: this.state.statusFilter })
        }
        if (this.state.expiredFilter != null) {
            filters.push({ id: "ex", value: this.state.expiredFilter })
        }
        if (this.state.nameFilter.length > 0) {
            filters.push({ id: "nm", value: this.state.nameFilter })
        }

        let obj = {
            todoListId: this.props.todoListId,
            filters, orderId: this.state.orderType,
            ascending: this.state.orderDirection
        }

        return obj;
    }

    onStatusChange = (value, id) => {
        if (value) {
            this.setState({
                statusFilter: id
            })
        }
    }

    onExpiredChange = (value, id) => {
        if (value) {
            this.setState({
                expiredFilter: id
            })
        }
    }

    onNameChange = (value) => {
        this.setState({
            nameFilter: value
        })
    }

    onOrderTypeChange = (value, id) => {
        if (value) {
            this.setState({
                orderType: id
            })
        }
    }

    onAscendingChange = (value, id) => {
        if (value) {
            this.setState({
                orderDirection: id
            })
        }
    }

    onApply = () => {
        let obj = this.formObject();
        this.props.filterAndOrder(obj);
        this.props.onApply()
    }

    onClear = () => {
        this.props.clearFiltersOrders();
        this.props.onClear();
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={validate.isFunction(this.props.onClose) ? this.props.onClose : null}
                centered
                size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Filter and Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={style.bodyContainer}>
                        <Row>
                            <Col xs={6} style={style.filterCol}>
                                <Container><div style={style.headerText}>FILTER BY</div></Container>
                                <Container>
                                    <Row style={style.fieldRow}>
                                        <Col xs={4}><div style={style.labelText}>Status</div></Col>
                                        <Col xs={4}>
                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="status"
                                                    id="true"
                                                    onChange={(e) => this.onStatusChange(e.target.checked, true)}
                                                />
                                                <div style={style.optionLabel}>Done</div>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="status"
                                                    id="false"
                                                    onChange={(e) => this.onStatusChange(e.target.checked, false)}
                                                />
                                                <div style={style.optionLabel}>Not done</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={style.fieldRow}>
                                        <Col xs={4}><div style={style.labelText}>Expired</div></Col>
                                        <Col xs={4}>
                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="expired"
                                                    id="true"
                                                    onChange={(e) => this.onExpiredChange(e.target.checked, true)}
                                                />
                                                <div style={style.optionLabel}>Yes</div>
                                            </div>
                                        </Col>
                                        <Col xs={4}>
                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="expired"
                                                    id="false"
                                                    onChange={(e) => this.onExpiredChange(e.target.checked, false)}
                                                />
                                                <div style={style.optionLabel}>No</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={style.fieldRow}>
                                        <Col xs={4}><div style={style.labelText}>Name</div></Col>
                                        <Col xs={8}>
                                            <Form.Control
                                                as="input"
                                                size="sm"
                                                placeholder="Name of todo..."
                                                onChange={(e) => this.onNameChange(e.target.value)} />
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                            <Col xs={6} style={style.orderCol}>
                                <Container><div style={style.headerText}>ORDER BY</div></Container>
                                <Container>
                                    <Row style={style.fieldRow}>
                                        <Col xs={6}>

                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="order"
                                                    id="cd"
                                                    onChange={(e) => this.onOrderTypeChange(e.target.checked, "cd")}
                                                />
                                                <div style={style.optionLabel}>Date Created</div>
                                            </div>

                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="order"
                                                    id="dl"
                                                    onChange={(e) => this.onOrderTypeChange(e.target.checked, "dl")}
                                                />
                                                <div style={style.optionLabel}>Deadline</div>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="order"
                                                    id="nm"
                                                    onChange={(e) => this.onOrderTypeChange(e.target.checked, "nm")}
                                                />
                                                <div style={style.optionLabel}>Name</div>
                                            </div>

                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="order"
                                                    id="st"
                                                    onChange={(e) => this.onOrderTypeChange(e.target.checked, "st")}
                                                />
                                                <div style={style.optionLabel}>Status</div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row style={style.fieldRow}>
                                        <Col xs={6}>
                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="type"
                                                    id="true"
                                                    onChange={(e) => this.onAscendingChange(e.target.checked, true)}
                                                />
                                                <div style={style.optionLabel}>Ascending</div>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div style={style.optionContainer}>
                                                <Form.Check
                                                    type="radio"
                                                    name="type"
                                                    id="false"
                                                    onChange={(e) => this.onAscendingChange(e.target.checked, false)}
                                                />
                                                <div style={style.optionLabel}>Descending</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={validate.isFunction(this.props.onClear) ? () => this.onClear() : null}>
                        Clear
                </Button>
                    <Button variant="primary" onClick={validate.isFunction(this.props.onApply) ? () => this.onApply() : null}>
                        Apply
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const bindAction = (dispatch) => {
    return {
        filterAndOrder: (foObj) => dispatch(filterAndOrder(foObj)),
        clearFiltersOrders: () => dispatch(clearFiltersOrders())
    }
}

export default connect(mapStateToProps, bindAction)(Radium(FilterOrder));