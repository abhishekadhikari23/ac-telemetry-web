import { io, Socket } from 'socket.io-client';

let socket = io('http://25.34.155.151:5000');

let roomId = process.argv[0];

socket.emit('subscribe-as-downstream', roomId);

socket.on('connected', () => {
	console.log('Connected');
});

socket.on('update-data', (data) => {
	console.log(data.gear);
});
