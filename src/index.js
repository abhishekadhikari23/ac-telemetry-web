import ACRemoteTelemetryClient from 'ac-remote-telemetry-client';
import { io } from 'socket.io-client';
// const ACRemoteTelemetryClient = require('ac-remote-telemetry-client');

let roomId = '';

const client = new ACRemoteTelemetryClient();

const socket = io('http://25.12.211.155:5000');

socket.emit('subscribe-as-upstream');

socket.on('connected', (id) => {
	roomId = id;

	client.on('HANDSHAKER_RESPONSE', (data) => console.log(data));
	client.on('RT_CAR_INFO', (data) => socket.emit('update-data', data, roomId));
	client.on('RT_LAP', (data) => console.log(data));

	// Start listening
	client.start();

	// Send initial handshake
	client.handshake();

	// Subscribe to desired updates
	client.subscribeUpdate();
});
