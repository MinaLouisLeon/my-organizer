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
     await db('Tasks')
     .insert([{
         name:req.body.taskName,
         start:req.body.start,
         end:req.body.end,
        color:'blue',
        status:'open',
        note:''
    }]);
    await db.select('*').from('Tasks').then((data) => {
        res.json(data)
    })
    console.log(req.body)
})

app.post('/delete-task',async (req,res) => {
    await db('Tasks').where('id',req.body.id).del();
    await db.select('*').from('Tasks').then((data) => {
        res.json(data);
    })
})

app.post('/get-tasks',async (req,res) => {
    await db.select('*').from('Tasks').then((data) => {
        res.json(data);
    })
})

app.post('/updateTask' , async (req,res) => {
    console.log(req.body)
    await db("Tasks").where('id',req.body.taskId).update({
        name:req.body.taskName,
        start:req.body.taskStart,
        end:req.body.taskEnd
    })
    await db.select('*').from('Tasks').then((data) => {
        res.json(data)
    })
})

app.post('/update-task-name', async (req,res) => {
    await db("Tasks").where('id',req.body.taskId).update({
        name:req.body.taskName
    })
    await db.select('*').from('Tasks').then((data) => {
        res.json(data)
    })
})

app.listen(3001)