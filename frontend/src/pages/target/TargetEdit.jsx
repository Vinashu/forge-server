import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { get, update, resetStatus } from '../../features/target/targetSlice';
import { getAll as getAllVariables } from '../../features/variable/variableSlice';
import { getAll as getAllOperations } from '../../features/operation/operationSlice';
import { getAll as getAllRewards } from '../../features/reward/rewardSlice';
import { Row, Form, Button, ButtonGroup, Badge, Spinner, Alert } from 'react-bootstrap';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

function TargetEdit() {
    const { variables } = useSelector((status) => status.variable);
    const { operations } = useSelector((status) => status.operation);
    const { rewards } = useSelector((status) => status.reward); 

    const { target, isLoading, isSuccess, isError, message } = useSelector((status) => status.target);
    const [ formData, setFormData ] = useState({
        _id: '',
        name: '',
        description: '',
        variable: '',
        operation: '',
        value: '',
        reward: ''
    });
    const { _id, name, description, variable, operation, value, reward } = formData;

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();    

    useEffect(() => {
        if(isError){
            toast.error(message);
            dispatch(resetStatus());
        } 
        if(isSuccess){
            dispatch(resetStatus());
            const { _id, name, description, variable, operation, value, reward }  = target;
            setFormData({ _id, name, description, variable, operation, value, reward } );
        }

        // eslint-disable-next-line
    }, [isError, isSuccess]);

    useEffect(() => {
        if(id){
            dispatch(get(id));
        }

        // eslint-disable-next-line
    }, [id, dispatch]);    

    useEffect(() => {
        if(variables?.length === 0) {
            dispatch(getAllVariables());
        }
        if(operations?.length === 0) {
            dispatch(getAllOperations());
        }        
        if(rewards?.length === 0) {
            dispatch(getAllRewards());
        }       
        // dispatch(resetStatus());
        // eslint-disable-next-line
    }, []);      

    function onCancel() {
        setFormData({ _id: '', name: '', description: '', variable: '', operation: '', value: '', reward: '' });
        navigate(`/target/${id}/detail`);
    }

    function handleChange(e) {
        setFormData((prev) => {return {...prev, [e.target.name]: e.target.value }});
    }

    const onSave = (e) => {
        e.preventDefault();   

        const data = {
            _id,
            name,
            description,
            variable,
            operation,
            value,
            reward
        };

        dispatch(update(data));
        navigate(`/target/${_id}/detail`);        
    };    

    function selectVariable(id){
        setFormData((prev) => {return {...prev, 'variable': id}});
    }

    function selectOperation(id){
        setFormData((prev) => {return {...prev, 'operation': id}});
    }

    function selectReward(id){
        setFormData((prev) => {return {...prev, 'reward': id}});
    }

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
                        id: {' '}
                        {isLoading ? (<Spinner />) : (<Badge bg="secondary">{' '}{_id}</Badge>)}                        
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
                    <div value={variable}>
                        <Alert variant='info'>
                            <strong>Variable: </strong> 
                            {
                                variables?.map((mapVariable) => {
                                    const color = variable ===  mapVariable?._id ? 'success' : 'secondary';
                                    return <span key={mapVariable?._id}>
                                           <Badge 
                                                onClick={() => selectVariable(mapVariable?._id)}
                                                className="pointer" 
                                                bg={color} 
                                                pill                                                 
                                                key={mapVariable?._id}><h6>{mapVariable?.name}</h6>
                                            </Badge>{' '}
                                            </span>
                                })
                            }
                        </Alert>
                    </div>
                    <div>
                        <Alert variant='warning'>
                            <strong>Operation: </strong> 
                            {
                                operations?.map((mapOperation) => {
                                    const color = operation ===  mapOperation?._id ? 'success' : 'secondary';
                                    return <span key={mapOperation?._id}>
                                        <Badge 
                                            onClick={() => selectOperation(mapOperation?._id)}
                                            className="pointer" 
                                            bg={color} 
                                            pill 
                                            key={mapOperation?._id}><h6>{mapOperation?.symbol}</h6>
                                        </Badge>{' '}
                                        </span>
                                })
                            }
                        </Alert>
                    </div>
                    <Form.Group className="mb-3">
                        <Alert variant='primary'>
                            <Form.Label htmlFor="value">Value</Form.Label>
                            <Form.Control
                                id="value" 
                                name="value" 
                                placeholder="Type the value" 
                                value={value} 
                                onChange={handleChange}
                            />
                        </Alert>                    
                    </Form.Group>                    
                    <div>
                        <Alert variant='success'>
                        <strong>Reward: </strong> 
                            {
                                rewards?.map((mapReward) => {
                                    const color = reward ===  mapReward?._id ? 'success' : 'secondary';
                                    return <span key={mapReward?._id}>
                                        <Badge 
                                            onClick={() => selectReward(mapReward?._id)}
                                            className="pointer" 
                                            style={{marginBottom:"5px"}} 
                                            bg={color} 
                                            pill 
                                            key={mapReward?._id}><h6>{mapReward?.name}</h6>
                                        </Badge>{' '}
                                        </span>
                                })
                            }                        
                        </Alert>                    
                    </div>     
                </Form>
                )}
            </Row>          
        </>
    );
};

export default TargetEdit;