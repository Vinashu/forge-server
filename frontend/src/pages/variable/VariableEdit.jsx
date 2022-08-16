import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { get, update, resetStatus } from '../../features/variable/variableSlice';
import { Row, Form, Button, ButtonGroup, Badge, Spinner } from 'react-bootstrap';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
// import { data } from './data';

function VariableEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { variable, isLoading, isSuccess, isError, message } = useSelector((status) => status.variable);
    const [ formData, setFormData ] = useState({
        _id: '',
        name: '',
        description: ''
    });
    const { _id, name, description } = formData;

    useEffect(() => {
        if(isError){
            toast.error(message);
            dispatch(resetStatus());
        } 
        if(isSuccess){
            dispatch(resetStatus());
            const { _id, name, description } = variable;
            setFormData({ _id, name, description });
        }         

        // eslint-disable-next-line
    }, [isError, isSuccess]);

    useEffect(() => {
        if(id){
            dispatch(get(id));
        }

        // eslint-disable-next-line
    }, [id, dispatch]);    

    function onCancel() {
        setFormData({_id: '', name: '', description: ''});
        navigate(`/variable/${id}/detail`);
    }

    function handleChange(e) {
        setFormData((prev) => {return {...prev, [e.target.name]: e.target.value }});
    }

    const onSave = (e) => {
        e.preventDefault();   

        const data = {
            _id,
            name,
            description
        };

        dispatch(update(data));
        navigate(`/variable/${_id}/detail`);        
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
            <Row >               
                {isLoading ? (<Spinner />) : (
                <Form>
                    <Form.Group className="mb-3">
                        id: 
                        {isLoading ? (<Spinner />) : (<Badge bg="secondary">{_id}</Badge>)}                        
                    </Form.Group>
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
                )}
            </Row>          
        </>
    );
};

export default VariableEdit;