const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const alertsRouter = require('./routes/alerts');
const authRouter = require('./routes/auth');
const newsRouter = require('./routes/news');
const stocksRouter = require('./routes/stocks');
const tickerRouter = require('./routes/ticker');

// Use routes
app.use('/api/alerts', alertsRouter);
app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);
app.use('/api/stocks', stocksRouter);
app.use('/api/ticker', tickerRouter);

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
