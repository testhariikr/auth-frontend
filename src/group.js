import React, { useState } from "react";
import './App.css';
import { Link } from "react-router-dom";
import GroupImageChat from "./groupImageChat";
import GroupUsers from "./groupUsers";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Group() {
  const [showImageChat, setShowImageChat] = useState(true); // State to manage visibility of GroupImageChat
  const [showGroupUsers, setShowGroupUsers] = useState(false); // State to manage visibility of GroupUsers

  const handleImageChatClick = () => {
    setShowImageChat(true);
    setShowGroupUsers(false);
  };

  const handleGroupUsersClick = () => {
    setShowImageChat(false);
    setShowGroupUsers(true);
  };

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" sticky="top">
        <Container>
          <Nav className="mx-auto">
            <Button onClick={handleImageChatClick}>Image Chat</Button>
            <Button onClick={handleGroupUsersClick}>Group Users</Button>
          </Nav>
        </Container>
      </Navbar>

      <header className="App-header">
        {/* Render GroupImageChat if showImageChat is true */}
        {showImageChat && <GroupImageChat />}
        {/* Render GroupUsers if showGroupUsers is true */}
        {showGroupUsers && <GroupUsers />}
      </header>
    </div>
  );
}

export default Group;
