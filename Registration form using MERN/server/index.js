const express =require("express")
const mongoose = require('mongoose')
const cors =require("cors")
const EmployeeModel1 = require('./models/Employee')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/employee");

app.post ("/login",  (req,res) =>{
    const {email , password} = req.body;
    EmployeeModel1.findOne({email: email} )
    .then(user => {
        if(user){
            if (user.password === password){
                res.json("Success")

            }else{
                res.json("Password Incorrect")
            }
        } else{
            res.json("Not found")
        }
    })
})





app.post('/register',(req, res) => {
EmployeeModel1.create(req.body)
.then(employees => res.json(employees))
.catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})