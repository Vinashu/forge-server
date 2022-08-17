import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../../components/EditorToolbar';
import { get, update, resetStatus } from '../../features/reward/rewardSlice';
import { getAll as getAllCategories } from '../../features/category/categorySlice';
import { Row, Form, Button, ButtonGroup, Badge, Spinner } from 'react-bootstrap';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

function RewardEdit() {
    const [editor, setEditor] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);
    const { reward, isLoading, isSuccess, isError, message } = useSelector((status) => status.reward);
    const [ formData, setFormData ] = useState({
        _id: '',
        name: '',
        description: '',
        imagePath: '',
        category: []
    });
    // eslint-disable-next-line
    let { _id, name, description, imagePath, category } = formData;

    useEffect(() => {
        if(isError){
            toast.error(message);
            dispatch(resetStatus());
        } 
        if(isSuccess){
            dispatch(resetStatus());
            const {  _id, name, description, imagePath, category } = reward;
            setFormData({ _id, name, description, imagePath, category });
            setEditor(description);
        }

        // eslint-disable-next-line
    }, [isError, isSuccess]);

    useEffect(() => {
        if(id){
            dispatch(get(id));
        }

        // eslint-disable-next-line
    }, [id, dispatch]);

    useEffect(() => {
        if(categories.length === 0) {
            dispatch(getAllCategories());
        }
        // eslint-disable-next-line
    }, [categories]);   

    function onCancel() {
        setFormData({_id: '', name: '', description: '', imagePath:'', category: []});
        navigate(`/reward/${id}/detail`);
    }

    function handleChange(e) {
        setFormData((prev) => {return {...prev, [e.target.name]: e.target.value }});
    }

    const onSave = (e) => {
        e.preventDefault();   

        const data = {
            _id,
            name,
            description: editor,
            imagePath,
            category
        };

        dispatch(update(data));
        navigate(`/reward/${_id}/detail`);        
    };    

    function toogleCategory(id) {
        if (!category.includes(id)) {
            category = [...category, id]
            setFormData((prev) => {
                return {
                    ...prev,
                    category
            }})
        } else {
            category = category.filter((cat) => cat !== id);
            setFormData((prev) => {
                return {
                    ...prev,
                    category
            }})

        }
    }    

    return(
        <>
            <ButtonGroup>
                <Button 
                    variant='success'
                    onClick={onSave}
                >
                    <FiSave size={25} /> Save
                </Button>{ '    '}
                <Button 
                    variant='danger'
                    onClick={onCancel}
                >
                    <GiCancel size={25} /> Cancel
                </Button>
            </ButtonGroup>
            <p></p>
            <hr />
            <Row >               
                {isLoading ? (<Spinner />) : (
                <Form>
                    <Form.Group className="mb-3">
                        id: {' '}
                        {isLoading ? (<Spinner />) : (<Badge bg="secondary">{_id}</Badge>)}                        
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control 
                            id="name" 
                            name="name"
                            placeholder="Type the name" 
                            value={name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <EditorToolbar />
                        {/* <Form.Label htmlFor="editor">Description</Form.Label> */}
                        <ReactQuill 
                            theme="snow"
                            id="editor" 
                            name="editor" 
                            value={editor}
                            onChange={setEditor}
                            modules={modules}
                            formats={formats}                            
                        />                        
                        {/* <Form.Control
                            id="description" 
                            name="description" 
                            placeholder="Type the description" 
                            value={description} 
                            onChange={handleChange}
                        /> */}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="imagePath">Image</Form.Label>
                        <Form.Control
                            id="imagePath" 
                            name="imagePath" 
                            placeholder="Type the image URL" 
                            value={imagePath} 
                            onChange={handleChange}
                        />
                        {imagePath && <img className='center' src={imagePath} alt={name} />}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="category">Category</Form.Label>
                        <div 
                            id="category"
                            name="category"
                            value={category}
                            onChange={handleChange}
                        >
                            {categories && categories?.map((cat) => {
                                const color = category?.includes(cat._id) ? 'success' : 'danger';
                                return <span key={cat._id} >
                                    <Badge 
                                        className='pointer'
                                        onClick={() => toogleCategory(cat._id)}
                                        bg={color} 
                                        key={cat._id} 
                                        value={cat._id}
                                    >
                                        <h6>&nbsp;{cat.name}&nbsp;</h6>
                                    </Badge>{' '}
                                </span>
                            })}

                        </div>
                    </Form.Group>                    
                </Form>
                )}
            </Row>          
        </>
    );
};

export default RewardEdit;