import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
const lnk="https://auth-backend-9794.onrender.com/"
function Logiin() {
  const { nextpage } = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useState("");
  const [inpdata, setInpdata] = useState({
    email: "",
    password: ""
  });

  function handelinpcng(event) {
    const { name, value } = event.target;
    setInpdata(
      (inpdta) => (
        { ...inpdata, [name]: value }
      )
    );
  }

  async function HandelSumit(e) {
    e.preventDefault();
    setAuth("Loging In... Please Wait");
    for (const key in inpdata) {
      if (inpdata[key] === "") {
        setAuth("Please fill in all fields");
        return;
      }
    }

    const { data } = await axios.post(lnk+'login', inpdata);

    setInpdata({
      email: "",
      password: ""
    });

    console.log(data);

    if (data.status === "ok") {
      localStorage.setItem('sesionToken', data.token);
      localStorage.setItem('Login', true);
      setAuth(data.token);
      if(nextpage){
        return navigate("/"+nextpage);
      }
     navigate("/hellouser");
    }

    localStorage.setItem('Login', false);
    setAuth("Could't Verify");
  }

  return (
    <div className="App">
      <header className="App-header">
        Login
        <div>
          <br></br>
          <input name="email" placeholder="Email" type="email" value={inpdata.email} onChange={handelinpcng}/>
          <br></br>
          <input name="password" placeholder="Password" type="password" value={inpdata.password} onChange={handelinpcng}/>
          <br></br>
          <button onClick={HandelSumit}>Login</button>
          <br></br>
          <Link to="/forgetpassword"><button>Forget Password?</button></Link>
          <br></br>
          No Account ? <Link to="/">Create</Link>
        </div>
        <div>
          <p>
            {auth}
          </p>
        </div>
      </header>
    </div>
  );
}

export default Logiin;
