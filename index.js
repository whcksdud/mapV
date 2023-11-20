const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const multer  = require('multer');
const { PythonShell } = require('python-shell');

// Set up multer for file upload
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

app.post('/upload-csv', upload.single('csvfile'), (req, res) => {
  const options = {
    args: [req.file.path],
  };
  PythonShell.run('generate_map.py', options, function (err, result) {
    if (err) throw err;
    res.json({ fileUrl: '/heatmap11.html' });
  });
});

app.listen(port, () => {
  console.log("Server running");
});