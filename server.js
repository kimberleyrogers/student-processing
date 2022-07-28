const express = require('express');
const pg = require('pg')

// const port = 3000;
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('hello')
});

app.listen(port, () => {
  console.log(`server listening on port: ${port}`)
});