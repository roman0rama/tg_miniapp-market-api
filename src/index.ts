
import('dotenv').then(dotenv => {
  dotenv.config({ path: '.env.local' });
});

import * as https from 'https';
import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user.routes.js';
import { reviewRouter } from './routes/reviews.routes.js'
import { categoryRouter } from './routes/categories.routes.js'
import { uploadsRouter } from './routes/uploads.routes.js';
import { productsRouter } from './routes/products.routes.js';

import * as fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const options = {
  key: fs.readFileSync(path.join(__dirname, '.cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '.cert', 'cert.pem'))
};
const app = express()
const PORT = 80

app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(cors());
app.use('/api', userRouter)
app.use('/api', reviewRouter)
app.use('/api', categoryRouter)
app.use('/api', uploadsRouter)
app.use('/api', productsRouter)

app.get('/', (req, res) => {
  const options = {
    root: path.join('src')
  };

  const fileName = 'index.html';

  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.error('Error sending file:', err);
    }
  });
})

https.createServer(options, app).listen(PORT, '127.0.0.1', () => {
  console.log(`CORS-enabled HTTPS web server started at localhost on: 127.0.0.1:${PORT}`);
});