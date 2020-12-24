import { io } from 'socket.io-client';

// create an io instance configured to use the same domain, to listen to server
export default io();