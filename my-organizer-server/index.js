const express = require('express');
const bodyparser = require('body-parser');
const {json} = require('body-parser');
const knex = require('knex');
const cors = require('cors');

const app = express();
app.use(cors());

const db = knex({
    client : 'pg',
    connection : {
        host : '127.0.0.1',
        user : 'postgres',
        password : '3694',
        database : 'myOrganizer'
    }
});

app.use(bodyparser.json())

app.post('/add-tasks',async (req,res) => {
     await db('tasks').insert([{Task:req.body.taskName,start:req.body.start,end:req.body.end,progress:req.body.progress,dependencies:req.body.dependencies,type:req.body.type}]);
    await db.select('*').from('tasks').then((data) => {
        res.json(data)
    })
    console.log(req.body)
})

app.post('/delete-task',async (req,res) => {
    await db('tasks').where('id',req.body.id).del();
    await db.select('*').from('tasks').then((data) => {
        res.json(data);
    })
})

app.post('/get-tasks',async (req,res) => {
    await db.select('*').from('tasks').then((data) => {
        res.json(data);
    })
})

app.listen(3001)