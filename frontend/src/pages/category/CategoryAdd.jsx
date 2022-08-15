import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Form, Button, ButtonGroup } from 'react-bootstrap';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

function CategoryEdit() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    function onCancel() {
        setFormData({name: '', description: ''});
        navigate('/category');
    }

    function handleChange(e) {
        setFormData((prev) => {return {...prev, [e.target.name]: e.target.value }});
    }

    return(
        <>
            {/* <h2>Category Add</h2> */}
            <ButtonGroup>
                <Button 
                    variant='success'
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
            <Row >

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Name/Title</Form.Label>
                        <Form.Control 
                            id="name" 
                            name="name"
                            placeholder="Type the name" 
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="description">Description</Form.Label>
                        <Form.Control
                            id="description" 
                            name="description" 
                            placeholder="Type the description" 
                            value={formData.description} 
                            onChange={handleChange}
                        />
                    </Form.Group>                    
                </Form>

            </Row>            
        </>
    );
};

export default CategoryEdit;