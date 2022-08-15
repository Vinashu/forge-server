import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';

function Register() {
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = formData;    

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

    const onSubmit = (e) => {
        e.preventDefault();   

        if(password !== password2) {
            toast.error('passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password
            };

            dispatch(register(userData));
        }
    };

    if(isLoading) {
        return <Spinner />
    }      

    return(
        <>
            <h1 className='center'><FaUser /> Register</h1>
            <hr />
            <Row className="justify-content-md-center">
                <Col xs lg="6" >
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">name</Form.Label>
                            <Form.Control 
                                id="name" 
                                name="name"
                                type="name"
                                placeholder="Type the name" 
                                value={name}
                                onChange={handleChange}
                            />
                        </Form.Group>
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
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password2">confirm password</Form.Label>
                            <Form.Control 
                                id="password2" 
                                name="password2"
                                type="password"
                                placeholder="Confirm the password" 
                                value={password2}
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
                                <BsArrowUpRightCircleFill size={25} /> Register
                            </Button>                            
                        </Form.Group>                   
                    </Form>
                </Col>
            </Row>            
        </>
    );
};

export default Register;