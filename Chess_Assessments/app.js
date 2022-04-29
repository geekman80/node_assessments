const express = require('express'); 
const bodyParser = require('body-parser');  
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.listen(3000); 
app.get('/',function(req, res)
{
    res.sendFile(__dirname + '/chess.html');
});
console.log("server live @ 3000");