
import React, { Component } from 'react'
import logo from '../img/logo.jpg';
import Navbar  from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class NavApp extends Component {
    render() {
        return (
<div>
            <Navbar>
                <Navbar.Brand href="/#">
                    {/* bg="light" variant="light" */}
                    <img src={logo} alt="HepsiBurada" width="300" height="50"  />
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                <Nav>
                <Navbar.Text> 
                    <div href="/#">
                    <span className="font-weight-bold">Link<span className="font-weight-normal">VOTE</span></span>  <span  className="font-weight-normal">Challenge</span>
                    </div>
                </Navbar.Text>
                </Nav>
                </Navbar.Collapse>
               
            </Navbar>
            {/* <hr className='hr-line' /> */}
             </div>
        )
    }
}

export default NavApp;