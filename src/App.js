import React from "react";
import './App.css';
import {Routes,Route} from "react-router-dom"
import Register from "./register";
import Login from "./login";
import Logiin from "./logiin";
import Forgetpassword from "./forgotpassword";
import ResetPassword from "./resetpassword";
import WelcomeUser from "./welcome";
import Groupindex  from "./groupindex"
import Group from "./group"
function App() {
    return( 
            <Routes>
                <Route path="/"  element={<Register/>}/>
                <Route path="/auth/login/:nextpage" element={<Logiin/>}/>
                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/auth/forgetpassword" element={<Forgetpassword/>}/>
                <Route path="/user" element={<WelcomeUser/>}/>
                <Route path="/user/groups" element={<Groupindex/>}/>
                <Route path="/group" element={<Group/>}/>
                <Route path="/auth/resetpassword/:resettoken"  element={<ResetPassword/>}/>
            </Routes>
    )
}

export default App;

