import React, { useEffect, useState } from "react";
import './App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
//import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom";
import linkmanager from "./link";
const lnk=linkmanager();

function Notes() {
  const navigate=useNavigate();
  const [msg, setmsg] = useState("Fetching Notes...");
  const [NotesData,setNotesData]=useState([])
  const [serchvalue,setserchvalue]=useState([])
  const [dispNotesData,setdispNotesData]=useState([])
  const [editstatus,seteditstatus]=useState(false)
  const [editdataid,seteditdataid]=useState("")
  const [inpdata,setinpdata]= useState({
    title: "",
    content: "",
    date:"",
    time:""
  });
  function HandleSearch(event){
    setserchvalue(event.target.value)
    setdispNotesData(NotesData.filter(
      (data)=>(
          data.title.toLowerCase().includes(event.target.value.toLowerCase())
      ) 
  ))
  if(!event.target.value){
    setdispNotesData(NotesData)
  }
      }
  
    
  

  async function Editt(id){
    setserchvalue('')
    seteditstatus(true)
    const editdta=NotesData.filter(
      (data)=>(
          data._id===id
      ) 
  );
  
  seteditdataid(id)
  console.log(editdta)
  setinpdata({
    ...editdta[0],
    date: editdta[0].reminder.date,time:editdta[0].reminder.time
  });
  }
  function handelinpcng(event) {
    const { name, value } = event.target;
    setinpdata(
      (inpdta) => (
        { ...inpdata, [name]: value }
      )
    );
    
  }
  async function HandleUpdate(){
    setserchvalue('')
    for (const key in inpdata) {
      if (inpdata[key] === "") {
        setmsg("Please fill in all fields");
        return;
      }
    }
    setmsg("Updating Notes...");
    seteditstatus(false)
    const {data} = await axios.post(lnk+'upt',
     {
      dataid:editdataid,
      title:inpdata.title,
      content:inpdata.content,
      time:inpdata.time,
      date:inpdata.date
    },
        { 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
     
    if(data.status==="ok"){
      setmsg(" ");
      setNotesData(data.notes)
      setdispNotesData(data.notes)
      seteditdataid("")
      setinpdata({
        title: "",
        content: "",
        date:"",
        time:""
      });
      return 
    }
    setmsg("Could not Update the Notes");
  }
  async function Handledelete(id){
    setserchvalue('')
    setmsg("Deleting Notes... ");
    seteditstatus(false)
    setinpdata({
      title: "",
      content: "",
      date:"",
      time:""
    });
    const {data} = await axios.post(lnk+'dlt',
     {
      dataid:id
    },
        { 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
     
    if(data.status==="ok" ){
      setmsg("");
      setNotesData(data.notes)
      setdispNotesData(data.notes)
      return 
    }
    setmsg("Could not Delete Notes");
  }
  async function HandelSumit(e) {
    e.preventDefault();
    console.log(inpdata)
    setserchvalue('')
    for (const key in inpdata) {
      if (inpdata[key] === "") {
        setmsg("Please fill in all fields");
        return;
      }
    }
    setmsg("Adding Notes...");
    const { data } = await axios.post(lnk+'createnote', 
    inpdata, 
    { 
      headers: {
        'acesstoken': localStorage.getItem('sesionToken')
      }
  });
  if(data.status==="ok"){
    setNotesData(data.notes)
    setdispNotesData(data.notes)
    setinpdata({
      title: "",
      content: "",
      date:"",
      time:""
    });
    setmsg(" ");
    return 
  }
  setmsg("Could not Add Notes");
  
  }

  


    
    async function getnotesdata(){
      console.log(localStorage.getItem('sesionToken'))
        const {data} = await axios.get(lnk+'usernotes', 
        { 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
     if(data.user===false){
      navigate("/login/usernotes")
     }
     else if(!data.notes){
      setmsg("No previous Notes")
     }
    else if(data.notes){
      setmsg(" ")
      setNotesData(data.notes)
      setdispNotesData(data.notes)
      return 
    }
    setNotesData([])
    setdispNotesData([])
    }

  
  
  useEffect(() => {
   getnotesdata();
  },[]);
  

    
   

  return (
    <div className="App">
      
      <header className="App-header">
        <div>
            <br></br>
            <input name="title" placeholder="Title" type="text" value={inpdata.title} onChange={handelinpcng}/>
            <br></br>
            <input name="content" placeholder="Write Notes" type="text" value={inpdata.content} onChange={handelinpcng}/>
            <br></br>
            <input type="date" value={inpdata.date} name="date" onChange={handelinpcng}/>
            <input type="time" value={inpdata.time} name="time" onChange={handelinpcng} />
            <br></br>
            <button  onClick={HandelSumit}>Add</button>
            {(editstatus)?(<button onClick={()=>HandleUpdate()}>Uptdate</button>):<></>}
            <br></br>
            {(NotesData.length)?(<input name="find" placeholder="Search by Title" type="text" value={serchvalue} onChange={HandleSearch}/>):<></>}
            <br></br>
            <br></br>
            
          </div>
        <div>
          {msg}
          <br></br>
        </div>
      <div>
      { 
                (dispNotesData.length)?(
                
                <ul >
                  <Container className="d-flex flex-wrap justify-content-center">
          {dispNotesData.map((data) => (
            <Card key={data._id} style={{ width: "18rem", margin: "10px" }} className="text-center">
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.content}</Card.Text>
                <Button
                  style={{ margin: "2%" }}
                  variant="primary"
                  onClick={() => Handledelete(data._id)}
                >
                  Delete {data.title}
                </Button>
                <Button
                  style={{ margin: "2%" }}
                  variant="primary"
                  onClick={() => Editt(data._id)}
                >
                  Edit {data.title}
                </Button>
                <Card.Text>{JSON.parse(JSON.stringify(data.reminder)).date}@{JSON.parse(JSON.stringify(data.reminder)).time}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </Container>
                </ul>
                )
                :
                (<p>No Notes....Add Notes</p>)
            }
            
      </div>
        <div>
            <Link to="/hellouser">Back(Home Page)</Link>
        </div>
      </header>
      <div className="App">
     
      </div>
      
    </div>
  );
  }

export default Notes;

