const app = require('./app');
const mongoose = require('mongoose');
const mongoConfig = require('./config/database');

mongoose.connect(
  `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`,
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
