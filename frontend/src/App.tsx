import React from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ margin: "20px 0", fontSize: "24px" }}>AI Knowledge Chatbot</h1>
      <FileUpload/>
      <Chat/>
    </div>
  );
}

export default App;
