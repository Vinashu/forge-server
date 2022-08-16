import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, ListGroup, Row, Spinner } from 'react-bootstrap';
import { getAll, resetStatus } from '../../features/operation/operationSlice';
import { TbNewSection } from 'react-icons/tb';

function OperationList() {
    const [selectedItem, setSelectedItem] = useState();

    function handleClick(id) {
        setSelectedItem(id);
    }

    const { operations, isSuccess, isLoading, isError, message } = useSelector((state) => state.operation);

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
    }, [isError, isSuccess, dispatch]);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    function onCreateNew() {
        setSelectedItem(0);
        dispatch(resetStatus());
        navigate('add');
    }

    return(
        <>
            <Button 
                variant='outline-success'
                // as={Link} to='add'
                onClick={onCreateNew}
            >
                <TbNewSection size={25} />  New Operation
            </Button>
            <p></p>
            <hr />
            <Row >
                {isLoading && <Spinner />}
                <ListGroup>
                    {
                    operations.map(
                        (operation) => 
                            <ListGroup.Item
                                as={Link} 
                                key={operation._id}
                                to={`/operation/${operation._id}/detail`} 
                                active={selectedItem === operation._id}            
                                onClick={() => handleClick(operation._id)} 
                            >
                                {operation.name}
                            </ListGroup.Item>                            
                        )
                    }
                </ListGroup>            
            </Row>
        </>
    );
};

export default OperationList;