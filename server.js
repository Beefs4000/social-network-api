const express = require('express');
const Thought = require('./models/Thought');
require('./config/connection');
const apiRoutes = require('./routes/api');

// const thought = new Thought({
//   text: 'hey',
//   username: 'you',
//   reactions:[
//     {
//       body: 'meh',
//       username: 'ya',
//     }
//   ]
// })
// thought.save().then(console.log);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
