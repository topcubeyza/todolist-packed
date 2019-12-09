import React, { Component } from "react";
import { Button, Modal, } from "react-bootstrap";
import validate from "validate.js"

const AlertModal = (props) => {
    return (
        <Modal show={props.show} onHide={validate.isFunction(props.onClose) ? props.onClose : null}>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={validate.isFunction(props.onClose) ? props.onClose : null}>
            {props.close ? props.close : "Close"}
          </Button>
          <Button variant="primary" onClick={validate.isFunction(props.onOkay) ? props.onOkay : null}>
            {props.ok ? props.ok : "OK"}
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AlertModal;