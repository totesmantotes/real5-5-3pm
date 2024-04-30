// Messages.js
import React, { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";
import person from '../assets/person.svg'; 
import send from '../assets/send.svg'; 

const socket = io('ws://localhost:3030');

const Messages = ({ account, messages, currentChannel }) => {
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);
  const socketRef = useRef(socket); 

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageObj = {
      channel: currentChannel ? currentChannel.id.toString() : '',
      account: account,
      text: message
    };

    if (message !== "") {
      socketRef.current.emit('new message', messageObj); 
    }

    setMessage("");
  };

  const scrollHandler = () => {
    setTimeout(() => {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  useEffect(() => {
    scrollHandler();
  }, [messages, currentChannel]);

  useEffect(() => {
    const cleanup = () => {
      const currentSocket = socketRef.current;
      currentSocket.off('connect');
      currentSocket.off('new message');
      currentSocket.off('get messages');
    };

    return cleanup;
  }, []);

  return (
    <div className="text">
      <div className="messages">
        {currentChannel && messages.filter(message => message.channel === currentChannel.id.toString()).map((message, index) => (
          <div className="message" key={index}>
            <img src={person} alt="Person" />
            <div className="message_content">
              <h3>{message.account.slice(0, 6) + '...' + message.account.slice(38, 42)}</h3>
              <p>
                {message.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={message} placeholder={`Message #${currentChannel ? currentChannel.name : ''}`} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">
          <img src={send} alt="Send Message" />
        </button>
      </form>
    </div>
  );
};

export default Messages;
