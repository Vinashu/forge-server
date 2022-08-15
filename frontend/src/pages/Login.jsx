import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { login, reset } from '../features/auth/authSlice';

function Login() {
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }

        // Redirect when logged in
        if(isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    },[isError, isSuccess, user, message, navigate, dispatch]);  

    function handleChange(e) {
        setFormData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    function onSubmit(e) {
        e.preventDefault();   

        const userData = {
            email, 
            password
        }

        dispatch(login(userData));        
    }

    if(isLoading) {
        return <Spinner />
    }    

    return(
        <>
            <h1 className='center'><FaSignInAlt /> Login</h1>
            <hr />
            <Row className="justify-content-md-center">
                <Col xs lg="6" >
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">email</Form.Label>
                            <Form.Control 
                                id="email" 
                                name="email"
                                type="email"
                                placeholder="Type the email" 
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">password</Form.Label>
                            <Form.Control 
                                id="password" 
                                name="password"
                                type="password"
                                placeholder="Type the password" 
                                value={password}
                                onChange={handleChange}
                            />
                        </Form.Group>     
                        <Form.Group className="d-grid gap-2">
                            <Button 
                                type="submit"
                                variant='primary large'
                                className='justify-content-md-center'
                                onClick={onSubmit}
                                value='Submit'
                            >
                                <BsArrowUpRightCircleFill size={25} /> Submit
                            </Button>                            
                        </Form.Group>                   
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Login;