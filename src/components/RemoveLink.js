
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class RemoveLink extends Component{
  render(){

    return (

<Modal.Dialog>
  <Modal.Header closeButton>
    <Modal.Title>Remove Link</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p>Do you want to remove:</p>
    <h3>DENEME</h3>
  </Modal.Body>

  <Modal.Footer>
  
    <Button variant="primary">OK</Button>
    <Button variant="secondary">CANCEL</Button>
  </Modal.Footer>
</Modal.Dialog>
    );
  }

}
export default RemoveLink;
