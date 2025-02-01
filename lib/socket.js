// lib/socket.js
import { io } from 'socket.io-client';

let socket;
const baseUrl = process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:8000';

export const initializeSocket = () => {
  if (!socket) {
    socket = io(baseUrl);
  }
  return socket;
};

export const getSocket = () => socket;