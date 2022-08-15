import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { get, update } from '../../features/category/categorySlice';
import { Row, Form, Button, ButtonGroup, Badge, Spinner } from 'react-bootstrap';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';
// import { data } from './data';

function CategoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const [ category ] = data.filter((item) => item._id === Number(id));    
    const { category, isLoading, isError, message } = useSelector((status) => status.category);
    const [ formData, setFormData ] = useState({
        _id: '',
        name: '',
        description: ''
    });
    const { _id, name, description } = formData;

    useEffect(() => {
        if(isError){
            toast.error(message);
        } 

        if(!category) {
            dispatch(get(id));            
        }

        if(category) {
            setFormData(category);
        }

        // eslint-disable-next-line
    }, [isError, id]);


    function onCancel() {
        setFormData({_id: '', name: '', description: ''});
        navigate(`/category/${id}/detail`);
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
        navigate(`/category/${_id}/detail`);
    };    

    // if(isLoading) {
    //     return <Spinner />;
    // }    

    return(
        <>
            {/* <h2>Category Edit</h2> */}
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
                            <p>id: <Badge bg="secondary">{formData._id}</Badge></p>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
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
                )}
            </Row>          
        </>
    );
};

export default CategoryEdit;