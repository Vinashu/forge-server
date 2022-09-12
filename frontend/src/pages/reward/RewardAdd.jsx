import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../../components/EditorToolbar';
import { Row, Form, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { create, resetStatus } from '../../features/reward/rewardSlice';
import { getAll as getAllCategories } from '../../features/category/categorySlice';
import { FiSave } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

function RewardAdd() {
    const quill = useRef();
    const [editor, setEditor] = useState('');
    const { categories } = useSelector((state) => state.category);
    const { isSuccess, isError, message } = useSelector((state) => state.reward);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imagePath: '',
        category: []
    });
    // eslint-disable-next-line
    let {name, description, imagePath, category} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onCancel() {
        setFormData({name: '', description: '', imagePath: '', category: []});
        navigate('/reward');
    }

    function handleChange(e) {
        setFormData((prev) => {return {...prev, [e.target.name]: e.target.value }});
    }

    useEffect(() => {
        if(isError) {
            toast.error(message);
            dispatch(resetStatus());
        }

        if(isSuccess) {
            setFormData({name: '', description: '', imagePath: '', category:[]});
            dispatch(resetStatus());
            navigate('/reward');
        }

        // eslint-disable-next-line
    },[isError, isSuccess]);

    useEffect(() => {
        if(categories.length === 0) {
            dispatch(getAllCategories());
        }
        // eslint-disable-next-line
    }, [categories]);    

    const onSave = (e) => {
        e.preventDefault();   
        const data = {
            name,
            description: editor,
            imagePath,
            category
        };
        // console.log(editor);
        // console.log(quill.current.editor.getContents());
        dispatch(create(data));
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
            <Row>
                <Form>
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
                            ref={quill}
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
                            {categories.map((cat) => {
                                const color = category.includes(cat._id) ? 'success' : 'danger';
                                return <span key={cat._id}>                                    
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
            </Row>            
        </>
    );
};

export default RewardAdd;