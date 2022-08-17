import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get, remove, resetStatus } from '../../features/category/categorySlice';
import { Button, Row, Spinner, Badge, ButtonGroup } from 'react-bootstrap';
import { FiEdit3 } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
// import { data } from './data';

function CategoryDetail() {
    // const [category] = data.filter((item) => item._id === Number(id));
    const { category, isLoading, isSuccess, isError, message } = useSelector((status) => status.category);
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
        if(category?._id !== id){
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
            dispatch(remove(category._id));
            navigate('/category');
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
                    {isLoading ? (<Spinner />) : category?._id}
                    </Badge>
                </div>
                <div>
                    <strong>name: </strong> 
                    {isLoading ? (<Spinner />) : category?.name}
                </div>            
                <div>
                    <strong>description: </strong> 
                    {isLoading ? (<Spinner />) : category?.description}
                </div>    
            </Row>
        </>
    );
};

export default CategoryDetail;