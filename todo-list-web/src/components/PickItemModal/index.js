import React, { Component } from "react";
import { Button, Modal, } from "react-bootstrap";
import { connect } from "react-redux";
import validate from "validate.js"

import TodoItemPick from "./TodoItemPick"

import Radium from "radium"
import {style} from "./style"

class PickItemModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedItem: {},
      todoItems: null
    }
  }

  componentWillReceiveProps(props) {
    if (props.show == false && this.props.show == true) {
      this.setState({
        selectedItem: {}
      })
    }
    if (this.state.todoItems != props.todoItems && props.todoItems != null) {
      this.setState({
        todoItems: props.todoItems
      })
    }
  }

  onItemSelected = (item) => {
    this.setState({
      selectedItem: item
    })
  }

  renderItems = () => {
    if (this.state.todoItems == null) {
      return null;
    }
    return this.state.todoItems.map(item => {
      if (this.props.doNotShow != item.id) {
        return <TodoItemPick dark={false} todoItem={item} onSelect={() => this.onItemSelected(item)} isSelected={item.id == this.state.selectedItem.id}/>
      }
    })
  }

  render() {

    return (
      <Modal
        show={this.props.show} 
        onHide={validate.isFunction(this.props.onClose) ? this.props.onClose : null} 
        centered 
        size="md">
        <Modal.Header>
          <Modal.Title>Pick a Todo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={style.bodyContainer}>
          {this.renderItems()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={validate.isFunction(this.props.onClose) ? this.props.onClose : null}>
            Close
            </Button>
          <Button variant="primary" onClick={validate.isFunction(this.props.onOkay) ? () => this.props.onOkay(this.state.selectedItem) : null}>
            OK
            </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const {
      todoItems,
  } = state.todoItem
  return {
      todoItems,
  };
}

export default connect(mapStateToProps)(Radium(PickItemModal));