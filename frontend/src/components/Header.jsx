import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { logout, reset } from '../features/auth/authSlice';
// Icons
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineCategory } from 'react-icons/md';
import { VscVariableGroup } from 'react-icons/vsc';
import { TbMathSymbols } from 'react-icons/tb';
import { GiWantedReward } from 'react-icons/gi';
import { FiTarget } from 'react-icons/fi';
import { SiCondaforge } from 'react-icons/si';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
	
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }	

    return (
        <header><nav>
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" fixed="top">
        <Container>
            <Navbar.Brand as={Link} to='/' ><SiCondaforge size={60} /> FORGE</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">          
			{user ? (
                <Nav className="me-auto" variant="pills" >
                    <Nav.Link as={Link} to='home'      ><AiOutlineHome size={25} /> Home</Nav.Link>
                    <Nav.Link as={Link} to='category'  ><MdOutlineCategory size={25} /> Category</Nav.Link>
                    <Nav.Link as={Link} to='variable'  ><VscVariableGroup size={25} /> Variable</Nav.Link>
                    <Nav.Link as={Link} to='operation' ><TbMathSymbols size={25} /> Operation</Nav.Link>
                    <Nav.Link as={Link} to='reward'    ><GiWantedReward size={25} /> Reward</Nav.Link>
                    <Nav.Link as={Link} to='target'    ><FiTarget size={25} /> Target</Nav.Link>
                </Nav>         
            ) : (
                <Nav className="me-auto" variant="pills" >
                </Nav>         
            )}
            {!user ? (                
                <Nav className="justify-content-end" variant="pills" >                
                    <Nav.Link as={Link} to='login'    ><FaSignInAlt /> Login</Nav.Link>
                    <Nav.Link as={Link} to='register' ><FaUser /> Register</Nav.Link> 
                </Nav>
            ) : (            
                <Nav className="justify-content-end" variant="pills" >                
                    <Nav.Link onClick={onLogout}  ><FaSignOutAlt /> Logout</Nav.Link>
                </Nav>
            )}
            </Navbar.Collapse>        
        </Container>
        </Navbar>
        </nav></header>
    );
};

export default Header;