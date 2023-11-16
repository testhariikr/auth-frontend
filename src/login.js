import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
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

    // Check if any input field is empty
    for (const key in inpdata) {
      if (inpdata[key] === "") {
        setAuth("Please fill in all fields");
        return;
      }
    }

    const { data } = await axios.post('https://auth-backend-9794.onrender.com/login', inpdata);

    setInpdata({
      email: "",
      password: ""
    });

    console.log(data);

    if (data.status === "ok") {
      localStorage.setItem('sesionToken', data.token);
      localStorage.setItem('Login', true);
      setAuth(data.token);
      return navigate("/hellouser");
    }

    localStorage.setItem('Login', false);
    setAuth("Could not verify");
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

export default Login;
