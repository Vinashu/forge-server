import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, ListGroup, Row, Spinner } from 'react-bootstrap';
import { getAll, resetStatus } from '../../features/target/targetSlice';
import { TbNewSection } from 'react-icons/tb';

function TargetList() {
    const [selectedItem, setSelectedItem] = useState();

    function handleClick(id) {
        setSelectedItem(id);
    }

    const { targets, isSuccess, isLoading, isError, message } = useSelector((state) => state.target);

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
                <TbNewSection size={25} />  New Target
            </Button>
            <p></p>
            <hr />
            <Row >
                {isLoading && <Spinner />}
                <ListGroup>
                    {
                    targets.map(
                        (target) => 
                            <ListGroup.Item
                                as={Link} 
                                key={target._id}
                                to={`/target/${target._id}/detail`} 
                                active={selectedItem === target._id}            
                                onClick={() => handleClick(target._id)} 
                            >
                                {target.name}
                            </ListGroup.Item>                            
                        )
                    }
                </ListGroup>            
            </Row>
        </>
    );
};

export default TargetList;