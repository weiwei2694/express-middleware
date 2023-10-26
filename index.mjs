import dotenv from 'dotenv';
import express from 'express';
import ErrorHandler from './middlewares/errorHandler.mjs';
import options from './middlewares/corsHandler.mjs';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Logger
if (process.env.NODE_ENV != 'test') {
  app.use(morgan('tiny'));
}
// Json
app.use(express.json());
// Urlencoded
app.use(express.urlencoded({ extended: true }));
// Helmet
app.use(helmet());
// Sanitize Request Data
app.use(xss());
// Gzip Compression
app.use(compression());
// Cors
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

app.get('/about', (req, res) => {
  res.send('ABOUT PAGE');
});

// 404
app.all('*', (req, res) => {
  res.sendStatus(404);
});

// Handling Error
app.use(ErrorHandler);

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
