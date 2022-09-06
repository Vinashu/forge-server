import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Form, InputGroup, ProgressBar, Alert, Row, Col, Card } from 'react-bootstrap'
import { BsCloudUpload } from 'react-icons/bs';
import { MdError } from 'react-icons/md';
import { FaUpload } from 'react-icons/fa';

function Images() {
    const { token } = useSelector((state) => state.auth.user);
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progressBar, setProgressBar] = useState({
        progressMax: 0,
        progressNow: 0,
        progressLabel: "",
        status: 0,
        message: "",
        messageType: false
    });
    const API_URL = '/upload';

    useEffect(() => {
        getImages();
        // eslint-disable-next-line
    }, []);    

    const getImages = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request({
                method: 'get',
                url: API_URL,
                headers: {
                    Authorization: `Bearer ${token}`
                }                
            });
            const json = await response.data;
            setImages(json);
        } catch (error) {
            const response = error.response;
            setProgressBar((prev) => {
                return {
                    ...prev,
                    status: response.status,
                    message: response.data?.message,
                    messageType: false
                }
            });            
        }
        setIsLoading(false);
    }

    const sendFiles = async () => {
        setProgressBar({
            progressMax: 0,
            progressNow: 0,
            progressLabel: "",
            status: 0,
            message: "",
            messageType: false           
        });
        const myFiles = document.getElementById("myFiles").files;
        const formData = new FormData();
        Object.keys(myFiles).forEach(key => {
            formData.append(myFiles.item(key).name, myFiles.item(key));
        });
        try {
            const response = await axios.request({
                method: 'POST',
                url: API_URL,
                data: formData,
                onUploadProgress: (p) => {
                    setProgressBar((prev) => {
                        return {
                            ...prev,
                            progressMax: p.total,
                            progressNow: p.loaded,
                            progressLabel: (Math.round((p.loaded/p.total) * 100)) + "%"
                        }
                    })
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }                
            });
            setProgressBar((prev) => {
                return {
                    ...prev,
                    status: response.status,
                    message: response.data?.message,
                    messageType: true
                }
            });
        } catch (error) {
            const response = error.response;
            setProgressBar((prev) => {
                return {
                    ...prev,
                    status: response.status,
                    message: response.data?.message,
                    messageType: false
                }
            });            
        }
        getImages();
    };

    function onSubmit(e) {
        e.preventDefault();
        sendFiles();
    }

    return (
        <>
            <h1>File Uploader</h1>
            <form id="uploadForm" encType="multipart/form-data">
            <InputGroup className="mb-3">
                <Form.Control variant={'primary'} type="file" name="myFiles" id="myFiles" accept="image/*" multiple />
                <Button onClick={onSubmit}><BsCloudUpload /> Upload</Button>
            </InputGroup>
            </form>
            <ProgressBar striped animated now={progressBar.progressNow} max={progressBar.progressMax} label={progressBar.progressLabel}/>
            <br />
            {progressBar.message !== "" &&
                <Alert variant={progressBar.messageType ? 'success' : 'danger'}>
                    {progressBar.messageType ? <FaUpload size={20} /> : <MdError size={25} /> }
                    &nbsp; 
                    {progressBar.status} <br/>
                    {progressBar.message}
                </Alert>
            }
            {
                !isLoading && 
                <Row xs={1} sm={2} md={3} lg={5} xl={6} xxl={8} className="g-4">
                {images.length > 0 && images.map((image) => (
                    <Col>
                        <Card key={image}>
                            <Card.Img key={image} variant="top" src={`images/${image}`}  style={{maxWidth: "303px", maxHeight: "160px", marginLeft: "auto", marginRight: "auto"}}/>
                            <Card.Body>
                            {/* <Card.Title>{image}</Card.Title> */}
                            <Card.Text>{image}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>                    
                ))}
            </Row>                
            }
        </>
    )
}

export default Images;