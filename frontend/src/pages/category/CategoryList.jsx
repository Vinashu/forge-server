import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroup, Row } from 'react-bootstrap';
import { data } from './data';
import { TbNewSection } from 'react-icons/tb';

function CategoryList() {
    const [selectedItem, setSelectedItem] = useState();

    function handleClick(id) {
        setSelectedItem(id);
    }

    return(
        <>
            {/* <h2>Category List</h2> */}
            <Button 
                variant='outline-success'
                as={Link} to='add'
                onClick={() => setSelectedItem(0)}
            >
                <TbNewSection size={25} />  New Caregory
            </Button>
            <p></p>
            <hr />
            <Row >
                <ListGroup>
                    {data.map(
                        (category) => 
                            <ListGroup.Item
                                key={category._id}
                                as={Link} 
                                to={`/category/${category._id}/detail`} 
                                active={selectedItem === category._id}            
                                onClick={() => handleClick(category._id)} 
                            >
                                {category.name}
                            </ListGroup.Item>                            
                        )                      
                    }                 
                </ListGroup>
            </Row>
        </>
    );
};

export default CategoryList;