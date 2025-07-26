const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 1000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const LOG_FILE = path.join(__dirname, 'logs.txt');

// Page d'accueil avec logs
app.get('/', (req, res) => {
  let logs = '';
  if (fs.existsSync(LOG_FILE)) {
    logs = fs.readFileSync(LOG_FILE, 'utf-8');
  }
  res.render('index', { logs });
});

// Vider les logs
app.post('/clear', (req, res) => {
  fs.writeFileSync(LOG_FILE, '', 'utf-8');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
