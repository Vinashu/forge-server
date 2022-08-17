import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get, remove, resetStatus } from '../../features/operation/operationSlice';
import { Button, Row, Spinner, Badge, ButtonGroup } from 'react-bootstrap';
import { FiEdit3 } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';

function OperationDetail() {
    const { operation, isLoading, isSuccess, isError, message } = useSelector((status) => status.operation);
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
        if(operation?._id !== id){
            dispatch(get(id));
        }
        // eslint-disable-next-line
    }, [id]);

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }

    function onDelete() {
        // eslint-disable-next-line
        if(confirm("Do you really want to delete this?")) {
            dispatch(remove(operation._id));
            navigate('/operation');
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
                    {isLoading ? (<Spinner />) : operation?._id}
                    </Badge>
                </div>
                <div>
                    <strong>name: </strong> 
                    {isLoading ? (<Spinner />) : operation?.name}
                </div>            
                <div>
                    <strong>description: </strong> 
                    {isLoading ? (<Spinner />) : operation?.description}
                </div>    
                <div>
                    <strong>symbol: </strong> 
                    {isLoading ? (<Spinner />) : operation?.symbol}
                </div>                    
            </Row>
        </>
    );
};

export default OperationDetail;