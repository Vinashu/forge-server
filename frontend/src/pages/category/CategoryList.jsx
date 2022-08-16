import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, ListGroup, Row, Spinner } from 'react-bootstrap';
import { getAll, resetStatus } from '../../features/category/categorySlice';
import { TbNewSection } from 'react-icons/tb';
// import { data } from './data';

function CategoryList() {
    const [selectedItem, setSelectedItem] = useState();

    function handleClick(id) {
        setSelectedItem(id);
    }

    const { categories, isSuccess, isLoading, isError, message } = useSelector((state) => state.category);

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
                <TbNewSection size={25} />  New Caregory
            </Button>
            <p></p>
            <hr />
            <Row >
                {isLoading && <Spinner />}
                <ListGroup>
                    {
                    categories.map(
                        (category) => 
                            <ListGroup.Item
                                as={Link} 
                                key={category._id}
                                to={`/category/${category._id}/detail`} 
                                active={selectedItem === category._id}            
                                onClick={() => handleClick(category._id)} 
                            >
                                {category.name}
                            </ListGroup.Item>                            
                        )
                    }
                </ListGroup>            
                {/* <ListGroup>
                    {isLoading ? (<Spinner />) : (
                    categories.map(
                        (category) => 
                            <ListGroup.Item
                                as={Link} 
                                key={category._id}
                                to={`/category/${category._id}/detail`} 
                                active={selectedItem === category._id}            
                                onClick={() => handleClick(category._id)} 
                            >
                                {category.name}
                            </ListGroup.Item>                            
                        )
                    )}
                </ListGroup> */}
            </Row>
        </>
    );
};

export default CategoryList;