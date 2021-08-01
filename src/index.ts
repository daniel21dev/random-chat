import dotenv from 'dotenv'
import { Server } from './Server';
dotenv.config()

// instace server and start
const server = new Server()
server.start()
