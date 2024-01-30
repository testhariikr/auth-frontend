import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import linkmanager from "./link";
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const lnk=linkmanager();
function Groupindex() {
    const navigate=useNavigate();
    const [inpdata,setinpdata]= useState({
      groupName: ""
    });
    async function getGroups(){
        const {data} = await axios.post(lnk+'/user/groups', 
        { 
         nothig: ''
       },{ 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
    if(data.status==="909"){
      return setGrpDta(data.groupData)
    }
    setGrpDta("Can't Fetch Details")
    navigate("/auth/login")
    }
  const [grpDta,setGrpDta]=useState([{GroupName:"Fetching Details...",groupId:"Fetching Details..."}])
  const [msg,setmsg]=useState("")

  useEffect(() => {
   getGroups();
  },[]);
  function handelinpcng(event) {
    const { name, value } = event.target;
    setinpdata(
      (inpdta) => (
        { ...inpdata, [name]: value }
      )
    );
    
  }
  function NavigateGroup(groupId){
    localStorage.setItem("groupId",groupId);
    return navigate("/group")

  }
  async function createGroup(e) {
    e.preventDefault();
    for (const key in inpdata) {
      if (inpdata[key] === "") {
        setmsg("Please fill in all fields");
        return
      }
    }
    setmsg("Adding Group...");
    const { data } = await axios.post(lnk+'/group/create', 
    inpdata, 
    { 
      headers: {
        'acesstoken': localStorage.getItem('sesionToken')
      }
  });
  if(data.status==="909"){
    setGrpDta(data.groupData)
    setinpdata({
      groupName: ""
    });
    
    return setmsg(" ");
  }
  setmsg(data.message);
  
  }
  async function HandleDeleteGroup(id){
    setmsg("Deleting Group... ");
    const {data} = await axios.post(lnk+'/group/delete',
     {
      delGrpId:id
    },
        { 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
     
    if(data.status==="909" ){
      setmsg(" ");
      return setGrpDta(data.groupData)
    }
    setmsg(data.message);
  }

    
   

  return (
    <div className="App">
      <header className="App-header">
        {msg}
        <br></br>
      <div>
      { 
       (grpDta.length)?(
                
                <ul >
                  <Container className="d-flex flex-wrap justify-content-center">
          {grpDta.map((data) => (
            <Card key={data._id} style={{ width: "18rem", margin: "10px" }} className="text-center">
              <Card.Body>
                <Card.Title>{data.groupName}</Card.Title>
                <Button onClick={()=>NavigateGroup(data.groupId)} >Go</Button>
                <Button
                  style={{ margin: "2%" }}
                  variant="primary"
                  onClick={() => HandleDeleteGroup(data.groupId)}
                >
                  Remove Group 
                </Button>
                
                
              </Card.Body>
            </Card>
          ))}
      </Container>
                </ul>
                )
                :
                (<p>No Notes....Create Group</p>)
            }
            
      </div>
         <div>
            <br></br>
            <input name="groupName" placeholder="Group Name" type="text" value={inpdata.groupName} onChange={handelinpcng}/>
            <br></br>
            <button  onClick={createGroup}>Create Group   </button>
            <br></br>
            
          </div>
      </header>
    </div>
  );
  }
export default Groupindex;

