// lib/socket.js
import { io } from 'socket.io-client';

let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io('http://localhost:8000');
  }
  return socket;
};

export const getSocket = () => socket;