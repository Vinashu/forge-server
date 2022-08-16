import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, ListGroup, Row, Spinner } from 'react-bootstrap';
import { getAll, resetStatus } from '../../features/variable/variableSlice';
import { TbNewSection } from 'react-icons/tb';

function VariableList() {
    const [selectedItem, setSelectedItem] = useState();

    function handleClick(id) {
        setSelectedItem(id);
    }

    const { variables, isSuccess, isLoading, isError, message } = useSelector((state) => state.variable);

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
                <TbNewSection size={25} />  New Variable
            </Button>
            <p></p>
            <hr />
            <Row >
                {isLoading && <Spinner />}
                <ListGroup>
                    {
                    variables.map(
                        (variable) => 
                            <ListGroup.Item
                                as={Link} 
                                key={variable._id}
                                to={`/variable/${variable._id}/detail`} 
                                active={selectedItem === variable._id}            
                                onClick={() => handleClick(variable._id)} 
                            >
                                {variable.name}
                            </ListGroup.Item>                            
                        )
                    }
                </ListGroup>            
            </Row>
        </>
    );
};

export default VariableList;