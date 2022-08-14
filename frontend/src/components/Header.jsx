import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

function Header() {
    return (
        <header><nav>
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" fixed="top">
        <Container>
            <Navbar.Brand as={Link} to='/home' href="#">FORGE</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">          
                <Nav className="me-auto" variant="pills" >
                    <Nav.Link as={Link} to='/home'      href="#home">Home</Nav.Link>
                    <Nav.Link as={Link} to='/category'  href="#Category">Category</Nav.Link>
                    <Nav.Link as={Link} to='/variable'  href="#Variable">Variable</Nav.Link>
                    <Nav.Link as={Link} to='/operation' href="#Operation">Operation</Nav.Link>
                    <Nav.Link as={Link} to='/reward'    href="#Reward">Reward</Nav.Link>
                    <Nav.Link as={Link} to='/target'    href="#Target">Target</Nav.Link>
                </Nav>         
                <Nav className="justify-content-end" variant="pills" >                
                    <Nav.Link as={Link} to='/logout'   href="#Logout"><FaSignOutAlt /> Logout</Nav.Link>
                    <Nav.Link as={Link} to='/login'    href="#Login"><FaSignInAlt /> Login</Nav.Link>
                    <Nav.Link as={Link} to='/register' href="#Register"><FaUser /> Register</Nav.Link> 
                </Nav>                  
            </Navbar.Collapse>        
        </Container>
        </Navbar>
        </nav></header>
    );
};

export default Header;