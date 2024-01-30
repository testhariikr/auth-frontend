import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import linkmanager from "./link";
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

const lnk=linkmanager();
function GroupUsers() {
  const [loading,setLoading]=useState(<Spinner/>)
  const [UsrDta,setUsrDta]=useState("")
    const navigate=useNavigate();
    const [inpdata,setinpdata]= useState({
      userName: ""
    });
    async function getUsers(){
      setLoading(<Spinner/>);
        const {data} = await axios.post(lnk+'/group/', 
        { 
         groupId:localStorage.getItem("groupId")
       },{ 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
     setLoading("");
    if(data.status==="909"){
      setUsrDta(data.groupData.users)
      return console.log(UsrDta.length)
    }
    setUsrDta("Can't Fetch Details")
    navigate("/auth/login")
    }
  
  const [msg,setmsg]=useState("")

  useEffect(() => {
   getUsers();
  },[]);
  function handelinpcng(event) {
    
    const { name, value } = event.target;
    setinpdata(
      (inpdta) => (
        { ...inpdata, [name]: value }
      )
    );
    
  }
  async function AddUser(e) {
    e.preventDefault();
    setLoading(<Spinner/>);
    console.log(UsrDta.length)
    for (const key in inpdata) {
      if (inpdata[key] === "") {
        setmsg("Please fill in all fields");
        return;
      }
    }
    setmsg("Adding User...");
    const { data } = await axios.post(lnk+'/group/adduser', 
    inpdata, 
    { 
      headers: {
        'acesstoken': localStorage.getItem('sesionToken'),
        "groupid":localStorage.getItem("groupId")
      }
  });
  setLoading("");
  if(data.status==="909"){
    console.log("okkk")
    
    setmsg(" ");
    setUsrDta(data.groupData);
    return setinpdata({userName: "" });
  }
  setmsg(data.message);
}
  async function RemoveUser(id){
    console.log(id)
    setmsg("Removing User... ");
    setLoading(<Spinner/>);
    const {data} = await axios.post(lnk+'/group/removeuser',
     {
      removeUserId:id
    },
        { 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken'),
           "groupid":localStorage.getItem("groupId")
         }
         
     })
     console.log(data)
     setLoading("");
    if(data.status==="909" ){
      setmsg("");
      return setUsrDta(data.groupData)
    }
    setmsg(data.message);
  }

    
   

  return (
    <div className="App">
      <header className="App-header">
        {msg}
        <br></br>
      <div>
      {UsrDta ? (
    <ul>
    <Container className="d-flex flex-wrap justify-content-center">
      {UsrDta.map((data) => (
        <Card key={data._id} style={{ width: "18rem", margin: "10px" }} className="text-center">
          <Card.Body>
            <Card.Text>{data.userName}</Card.Text>
            <Button
              style={{ margin: "2%" }}
              variant="primary"
              onClick={() => RemoveUser(data._id)}
            >
              Remove User
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  </ul>
) : (
  <p>No Users... Add Users</p>
)}
            
      </div>
         <div>
            <br></br>
            <input name="userName" placeholder= "User Name" type="text" value={inpdata.userName} onChange={handelinpcng}/>
            <br></br>
            <button  onClick={AddUser}>Add User   </button>
            <br></br>
            
          </div>
      </header>
    </div>
  );
  
}
export default GroupUsers;

