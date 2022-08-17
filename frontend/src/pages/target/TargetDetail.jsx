import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get, remove, resetStatus } from '../../features/target/targetSlice';
import { getAll as getAllVariables } from '../../features/variable/variableSlice';
import { getAll as getAllOperations } from '../../features/operation/operationSlice';
import { getAll as getAllRewards } from '../../features/reward/rewardSlice';
import { Button, Row, Spinner, Badge, ButtonGroup, Alert } from 'react-bootstrap';
import { FiEdit3 } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';

function TargetDetail() {
    const { variables } = useSelector((status) => status.variable);
    const { operations } = useSelector((status) => status.operation);
    const { rewards } = useSelector((status) => status.reward);
    const { target, isLoading, isSuccess, isError, message } = useSelector((status) => status.target);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isError){
            toast.error(message);
            dispatch(resetStatus());
        } 

        if(isSuccess){
            dispatch(resetStatus());
        }

        // eslint-disable-next-line
    }, [isError, isSuccess]);

    useEffect(() => {
        if(target?._id !== id){
            dispatch(get(id));
        }
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
    }, [id]);

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }

    function onDelete() {
        // eslint-disable-next-line
        if(confirm("Do you really want to delete this?")) {
            dispatch(remove(target._id));
            navigate('/target');
        }
    }

    return(
        <>        
            <ButtonGroup>
                <Button as={Link} to={`../${id}/edit`} ><FiEdit3 size={25} /> Edit</Button>
                <Button onClick={onDelete} variant='danger'><AiFillDelete size={25} /> Delete</Button>
            </ButtonGroup>
            <p></p>
            <hr />
            <Row >
                <div>
                <strong>id: </strong> 
                    <Badge bg="secondary">{'  '}
                    {isLoading ? (<Spinner />) : target?._id}
                    </Badge>
                </div>
                <div>
                    <strong>name: </strong> 
                    {isLoading ? (<Spinner />) : target?.name}
                </div>
                <div>
                    <strong>description: </strong> 
                    {isLoading ? (<Spinner />) : target?.description}
                </div>
                <div>
                    <Alert variant='info'>
                        <strong>Variable: </strong> {variables?.find((variable) => variable._id === target.variable)?.name}
                    </Alert>
                </div>
                <div>
                    <Alert variant='warning'>
                        <strong>Operation: </strong> {operations?.find((operation) => operation._id === target.operation)?.symbol}
                    </Alert>
                </div>
                <div>
                    <Alert variant='primary'>
                        <strong>Value: </strong> {target.value}
                    </Alert>
                </div>
                <div>
                    <Alert variant='success'>
                    <strong>Reward: </strong> {rewards?.find((reward) => reward._id === target.reward)?.name}
                    </Alert>                    
                </div>
            </Row>
        </>
    );
};

export default TargetDetail;