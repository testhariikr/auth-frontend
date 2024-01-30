import React, { useEffect, useState } from 'react';
import axios from 'axios';
import linkmanager from "./link";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

const lnk = linkmanager();

function GroupImageChat() {
    const [loading, setLoading] = useState(<Spinner animation="border" />);
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [image, setImage] = useState(null);
    const [imgData, setImgData] = useState([]);
    const [grpName, setGrpName] = useState("");
    const [inpData, setInpData] = useState({
        description: "",
        title: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInpData({
            ...inpData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const deleteImage = async (imgId) => {
        setMsg("Deleting Image...");
        setLoading(true);
        try {
            const { data } = await axios.post(`${lnk}/group/deleteimage`, { imageId: imgId }, {
                headers: {
                    'acesstoken': localStorage.getItem('sesionToken'),
                    'groupid': localStorage.getItem("groupId")
                }
            });
            setLoading(false);
            if (data.status === "909") {
                setMsg("");
                setImgData(data.groupData);
            } else {
                setMsg(data.message);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            setLoading(false);
            setMsg("An error occurred while deleting the image.");
        }
    };

    const getImage = async () => {
        setMsg("Fetching Details...");
        setLoading(true);
        try {
            const { data } = await axios.post(`${lnk}/group/`, { groupId: localStorage.getItem("groupId") }, {
                headers: {
                    'acesstoken': localStorage.getItem('sesionToken')
                }
            });
            setLoading(false);
            if (data.status === "909") {
                setImgData(data.groupData.images);
                setMsg("");
                setGrpName(data.groupData.groupName);
            } else {
                setImgData([]);
                setMsg("Can't Fetch Details");
                navigate("/auth/login");
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setLoading(false);
            setImgData([]);
            setMsg("An error occurred while fetching images.");
            navigate("/auth/login");
        }
    };

    const addImage = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMsg("Adding Image...");
    const formData = new FormData();
    formData.append('image', image);
      try {
          const { data } = await axios.post(`${lnk}/upload/`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'acesstoken': localStorage.getItem('sesionToken'),
                  'groupid': localStorage.getItem("groupId"),
                  'pagelocation': "group",
                  'title':inpData.title,
                  'description':inpData.description
              }
          });
          setLoading(false);
          if (data.status === "909") {
              setMsg("");
              setImgData(data.imageData);
          } else {
              setMsg(data.message);
          }
      } catch (error) {
          console.error('Error uploading image:', error);
          setLoading(false);
          setMsg("An error occurred while uploading the image.");
      }
  };
  
  function convertTimestampToReadableDate(timestamp) {
    const date = new Date(timestamp);
    return date.toDateString();
  }
    useEffect(() => {
        getImage();
    }, []);

    return (
        <div>
            {msg && <p>{msg}</p>}
            {loading && <Spinner animation="border" />}
            <br />
            <h3>{grpName}</h3>
            {imgData.length > 0 ? (
                <ul>
                    <Container className="d-flex flex-wrap justify-content-center">
                        {imgData.map((data) => (
                            <Card key={data._id} style={{ width: "auto", margin: "2px" }} className="text-center">
                                <Card.Body>
                                  <Card.Title>{convertTimestampToReadableDate(data.createdAt)}</Card.Title>
                                    <Card.Img src={data.imgPath} width={300} height={250} alt='hjgcfgh' />
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Text>{data.description}</Card.Text>
                                    
                                    <Button onClick={() => deleteImage(data._id)}>Delete Image</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Container>
                </ul>
            ) : (
                <p>No Users... Add Users</p>
            )}
            <div>
                <Form onSubmit={addImage}>
                    <Form.Control value={inpData.title} name='title' onChange={handleInputChange} placeholder='Title' type="text" />
                    <Form.Control value={inpData.description} name='description' onChange={handleInputChange} placeholder='Description' type="text" />
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Select Image From Device</Form.Label>
                        <Form.Control type="file" name="image" accept="image/*" onChange={handleImageChange} required />
                    </Form.Group>
                    <Button variant="primary" type='submit'>Upload</Button>
                </Form>
            </div>
        </div>
    );
}

export default GroupImageChat;
