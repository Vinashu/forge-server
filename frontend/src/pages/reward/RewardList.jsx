import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, ListGroup, Row, Spinner } from 'react-bootstrap';
import { getAll, resetStatus } from '../../features/reward/rewardSlice';
import { TbNewSection } from 'react-icons/tb';

function RewardList() {
    const [selectedItem, setSelectedItem] = useState();

    function handleClick(id) {
        setSelectedItem(id);
    }

    const { rewards, isSuccess, isLoading, isError, message } = useSelector((state) => state.reward);

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
                <TbNewSection size={25} />  New Reward
            </Button>
            <p></p>
            <hr />
            <Row >
                {isLoading && <Spinner />}
                <ListGroup>
                    {
                    rewards.map(
                        (reward) => 
                            <ListGroup.Item
                                as={Link} 
                                key={reward._id}
                                to={`/reward/${reward._id}/detail`} 
                                active={selectedItem === reward._id}            
                                onClick={() => handleClick(reward._id)} 
                            >
                                {reward.name}
                            </ListGroup.Item>                            
                        )
                    }
                </ListGroup>            
            </Row>
        </>
    );
};

export default RewardList;