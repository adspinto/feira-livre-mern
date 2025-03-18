import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { getUserById, createUser }  from './controllers/user.js';


dotenv.config(); 

mongoose.set("strictQuery", false);
  
const mongoDB = process.env.MONGO_URI;

async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('HELLO FROM 2222');
})
app.get('/user/:id', getUserById);
app.post('/user', createUser);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));