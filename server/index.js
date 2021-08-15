import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();
const app = express();

app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello to Oyeeah memories API');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useUnifiedTopology: true , useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log('Server is running on port:' + PORT)))
    .catch((error) =>  console.log(error.message));

mongoose.set('useFindAndModify', false);



// let port = process.env.PORT;
// if(port == null || port == "") {
//   port = 5000;
// }

// app.listen(port, function() {
//   console.log("Server started on port: " + port);
// });
