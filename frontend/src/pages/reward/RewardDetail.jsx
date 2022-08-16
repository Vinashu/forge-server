import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get, remove, resetStatus } from '../../features/reward/rewardSlice';
import { getAll as getAllCategory } from '../../features/category/categorySlice';
import { Button, Row, Spinner, Badge, ButtonGroup } from 'react-bootstrap';
import { FiEdit3 } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';

function RewardDetail() {
    const { reward, isLoading, isSuccess, isError, message } = useSelector((status) => status.reward);
    const { categories } = useSelector((status) => status.category);
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
        if(reward?._id !== id){
            dispatch(get(id));
        }
        if(categories.length === 0) {
            dispatch(getAllCategory());
        }
        // eslint-disable-next-line
    }, [id]);

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }

    function onDelete() {
        // eslint-disable-next-line
        if(confirm("Do you really want to delete this?")) {
            dispatch(remove(reward._id));
            navigate('/reward');
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
                <p>
                <strong>id: </strong> 
                    <Badge bg="secondary">{'  '}
                    {isLoading ? (<Spinner />) : reward?._id}
                    </Badge>
                </p>
                    {isLoading ? (<Spinner />) : <h2>{reward?.name}</h2>}
                    {isLoading ? (<Spinner />) : <p dangerouslySetInnerHTML={{__html: reward.description}}></p>}
                <p>
                    <strong>image: </strong> 
                    {isLoading ? (<Spinner />) : reward?.imagePath}                   
                </p>
                <p>
                    {reward?.imagePath && <img className='center' src={reward?.imagePath} alt={reward?.name} />}
                </p>
                <p>
                    <strong>category: </strong> 
                    {isLoading ? (<Spinner />) : (
                        <div>
                            {reward?.category?.map((category) => {                                
                                return  <><Badge bg="success" key={category}><h6>&nbsp;{categories?.find((cat) => cat._id === category)?.name}&nbsp;</h6></Badge>{' '}</>
                            })}                            
                        </div>
                    )}
                </p>
            </Row>
        </>
    );
};

export default RewardDetail;