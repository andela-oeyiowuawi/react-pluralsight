import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression'
/*eslint-disable no-console*/
const app = express();
const port = 3000;
app.use(compression());
app.use(express.static('dist'));

app.get('*', function (req, res){
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err){
  if(err){
    console.log(err);
  } else{
    console.log(`Your app is running on port ${port}`);
    open(`http://localhost:${port}`);
  }
});
