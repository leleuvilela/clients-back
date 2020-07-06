require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose');
const mongoConfig = require('./config/database');

const mongoUrl = process.env.MONGODB_URI ? process.env.MONGODB_URI : `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;

mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);

app.listen(process.env.PORT || 3333, () => {
  console.log('⚡️ Server listening on http://localhost:3333');
});
