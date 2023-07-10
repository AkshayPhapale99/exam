const express = require('express');
const cors = require('cors');
const config = require('config');
const mysql = require('mysql');

const app = express();

var connection = mysql.createConnection({
    host     : config.get("host"),
    user     :  config.get("user"),
    password :  config.get("password"),
    database :  config.get("database")
   });

app.use(cors('*'));
app.use(express.json());

app.get("/:e_name", (request, response)=>{
    var query = `select * from Employee_Tb where e_name='${request.params.e_name}'`;
    connection.query(query, (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})

app.post("/", (request, response)=>{
    var query = 
    `insert into Employee_Tb values(${request.body.id}, '${request.body.e_name}','${request.body.email}','${request.body.password}',${request.body.emp_id},'${request.body.dname}','${request.body.doj}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

app.delete("/:doj", (request, response)=>{
    var query = 
    `delete from Employee_Tb where doj = '${request.params.doj}'`;
                    
    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

app.put("/:id", (request, response)=>{
    var query = 
    `update Employee_Tb set dname='${request.body.dname}',doj='${request.body.doj}' where id=${request.params.id}`;
                    
    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

const portNo = config.get("PORT");
app.listen(portNo,()=>{console.log("Server Started at " + portNo)})