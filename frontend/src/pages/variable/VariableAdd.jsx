import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Row, Form, Button, ButtonGroup } from 'react-bootstrap';
import { create, resetStatus } from '../../features/variable/variableSlice';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

function VariableAdd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isSuccess, isError, message } = useSelector((state) => state.variable);    

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const {name, description} = formData;

    function onCancel() {
        setFormData({name: '', description: ''});
        navigate('/variable');
    }

    function handleChange(e) {
        setFormData((prev) => {return {...prev, [e.target.name]: e.target.value }});
    }

    useEffect(() => {
        if(isError) {
            toast.error(message);
            dispatch(resetStatus());
        }

        if(isSuccess) {
            setFormData({name: '', description: ''});
            dispatch(resetStatus());
            navigate('/variable');
        }

        // eslint-disable-next-line
    },[isError, isSuccess]);

    const onSave = (e) => {
        e.preventDefault();   

        const data = {
            name,
            description,
        };

        dispatch(create(data));
    };    

    return(
        <>
            <ButtonGroup>
                <Button 
                    variant='success'
                    onClick={onSave}
                >
                    <FiSave size={25} /> Save
                </Button>{ '    '}
                <Button 
                    variant='danger'
                    onClick={onCancel}
                >
                    <GiCancel size={25} /> Cancel
                </Button>
            </ButtonGroup>
            <p></p>
            <hr />
            <Row>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control 
                            id="name" 
                            name="name"
                            placeholder="Type the name" 
                            value={name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="description">Description</Form.Label>
                        <Form.Control
                            id="description" 
                            name="description" 
                            placeholder="Type the description" 
                            value={description} 
                            onChange={handleChange}
                        />
                    </Form.Group>                    
                </Form>

            </Row>            
        </>
    );
};

export default VariableAdd;