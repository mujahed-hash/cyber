const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/cyberforce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected successfully to mongo');
  })
  .catch((e) => {
    console.log('error while connecting to mongoDB');
    console.log(e);
  });

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', true);

module.exports = {
  mongoose,
};