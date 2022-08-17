import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Row, Form, Button, ButtonGroup, Alert, Badge } from 'react-bootstrap';
import { create, resetStatus } from '../../features/target/targetSlice';
import { getAll as getAllVariables } from '../../features/variable/variableSlice';
import { getAll as getAllOperations } from '../../features/operation/operationSlice';
import { getAll as getAllRewards } from '../../features/reward/rewardSlice';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

function TargetAdd() {
    const { variables } = useSelector((status) => status.variable);
    const { operations } = useSelector((status) => status.operation);
    const { rewards } = useSelector((status) => status.reward);    
    const { isSuccess, isError, message } = useSelector((state) => state.operation);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        variable: '',
        operation: '',
        value: '',
        reward: ''
    });

    let {name, description, variable, operation, value, reward} = formData;

    function onCancel() {
        setFormData({name: '', description: '', variable: '', operation: '', value: '', reward: ''});
        navigate('/target');
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
            toast.success('Way to go!');
            setFormData({name: '', description: '', variable: '', operation: '', value: '', reward: ''});
            dispatch(resetStatus());
            navigate('/target');
        }

        // eslint-disable-next-line
    },[isError, isSuccess]);

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
        // eslint-disable-next-line
    }, [dispatch]);    

    const onSave = (e) => {
        e.preventDefault();   

        const data = {
            name,
            description,
            variable,
            operation,
            value,
            reward
        };
        dispatch(create(data));
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
                        {/* <strong>Reward: </strong> {rewards?.find((reward) => reward._id === reward)?.name} */}
                        </Alert>                    
                    </div>                    
                </Form>
            </Row>            
        </>
    );
};

export default TargetAdd;