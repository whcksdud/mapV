const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const multer  = require('multer');
const { PythonShell } = require('python-shell');
 
const upload = multer({ dest: 'uploads/' });


app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname)));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/js'));
app.use(express.static(__dirname + '/public/css'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/json', upload.single('jsonfile'), (req, res) => {
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