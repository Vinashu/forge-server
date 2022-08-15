import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import { FiEdit3 } from 'react-icons/fi';
import { data } from './data';

function CategoryDetail() {
    const {id} = useParams();
    const [category] = data.filter((item) => item._id === Number(id));

    return(
        <>
            {/* <h2>Category Detail </h2> */}
            {/* <Button onClick={() => navigate('edit')} >Edit</Button> */}
            <Button as={Link} to={`../${id}/edit`} ><FiEdit3 size={25} /> Edit</Button>
            <p></p>
            <hr />
            <Row >
            <p>
                <strong>id:</strong> {category._id}
            </p>
            <p>
                <strong>name:</strong> {category.name}
            </p>            
            <p>
                <strong>description:</strong> {category.description}
            </p>    
            </Row>
        </>
    );
};

export default CategoryDetail;