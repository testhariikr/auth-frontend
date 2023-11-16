import React from "react";
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from "./register";
import Login from "./login";
import Forgetpassword from "./forgotpassword";
import ResetPassword from "./resetpassword";
import WelcomeUser from "./welcome";

function App() {
    return(
       
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgetpassword" element={<Forgetpassword/>}/>
                <Route path="/hellouser" element={<WelcomeUser/>}/>
                <Route path="/resetpassword/:resettoken" element={<ResetPassword/>}/>
            </Routes>
    )
}

export default App;
