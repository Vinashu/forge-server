import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Form, Button, ButtonGroup } from 'react-bootstrap';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
import { data } from './data';

function CategoryEdit() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [category] = data.filter((item) => item._id === Number(id));    
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        description: ''
    });

    useEffect(() => {
        if(id) {
            setFormData(category);
        }
    },[id, category]);

    function onCancel() {
        setFormData({_id: '', name: '', description: ''});
        navigate(`/category/${id}`);
    }

    function handleChange(e) {
        setFormData((prev) => {return {...prev, [e.target.name]: e.target.value }});
    }

    return(
        <>
            {/* <h2>Category Edit</h2> */}
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