import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navigation from './Navigation';
import Servers from './Servers';
import Channels from './Channels';
import Messages from './Messages';
import { io } from "socket.io-client";

// ABIs
import DappcordABI from '../abis/Dappcord.json'; // Renamed to avoid confusion with component

// Config
import config from '../config.json';

function Dappcord({ account, setAccount }) {
  const [provider, setProvider] = useState(null);
  const [dappcord, setDappcord] = useState(null);
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      const dappcordContract = new ethers.Contract(config[network.chainId].Dappcord.address, DappcordABI, provider);
      setDappcord(dappcordContract);

      const totalChannels = await dappcordContract.totalChannels();
      const channels = [];

      for (let i = 1; i <= totalChannels; i++) {
        const channel = await dappcordContract.getChannel(i);
        channels.push(channel);
      }

      setChannels(channels);

      window.ethereum.on('accountsChanged', async () => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error loading blockchain data:", error);
    }
  };

  useEffect(() => {
    loadBlockchainData();

    // Socket setup and cleanup code...
    const socket = io('ws://localhost:3030');

    socket.on("connect", () => {
      socket.emit('get messages');
    });

    socket.on('new message', (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    socket.on('get messages', (allMessages) => {
      setMessages(allMessages);
    });

    return () => {
      socket.off('connect');
      socket.off('new message');
      socket.off('get messages');
    };
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <main>
        <Servers />
        <Channels
          provider={provider}
          account={account}
          dappcord={dappcord}
          channels={channels}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />
        <Messages account={account} messages={messages} currentChannel={currentChannel} />
      </main>
    </div>
  );
}

export default Dappcord;
