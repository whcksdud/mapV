const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const multer  = require('multer');
const { PythonShell } = require('python-shell');
const bodyParser = require('body-parser');
const upload = multer({ dest: 'uploads/' });


app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname)));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/mapv2', (req, res) => {
  const postData = req.body;

  const options = {
    args: [JSON.stringify(postData)] 
  };
  
  PythonShell.run('generate_map.py', options, function (err, result) {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.post('/mapv1', upload.single('jsonfile'), (req, res) => {
  const options = {
    args: [req.file.path, req.body.selectedColumns],
  };
  PythonShell.run('generate_map.py', options, function (err, result) {
    if (err) throw err;
    res.json({ success: true });  
  });
});

app.listen(port, () => {
  console.log("Server running");
});