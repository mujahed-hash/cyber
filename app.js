const express = require('express');
const {mongoose} = require('./database/mongoose');
const http = require('http');

const app = express()
const cors = require('cors');
var path = require('path');
const jobpostRoute = require('./router/jobpost');
const applyJobRoute = require('./router/applyjobs');
// const loginRoute = require('./router/login');
// const publicRoute = require('./router/public');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:'true'}));

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//jobs post
app.use('/api/jobpost', jobpostRoute);
app.use('/api', applyJobRoute)
app.use('/uploads', express.static(path.join('uploads')));

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
// app.use(express.static(path.join(__dirname, 'public/assets')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/assets/index.html'));
// });

app.listen(5000, (req,res)=>{
    console.log('server running')
})