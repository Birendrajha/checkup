const express=require('express')
const app=express()
const bcrypt=require('bcrypt')

const mongoose=require ('mongoose')
const jwt=require('jsonwebtoken')

const checkAuth=require('./middelware/auth')

app.use(express.json())

const User=require('./models/user');
const Task=require('./models/task');

app.post('/signup',async(req,res)=>{
     const email = req.body.email;
     const password = req.body.password;
     try{
     const existingUser= await  User.find({email:email})
       if(existingUser===null || existingUser===undefined){
                bcrypt.hash(password,10,async(err,hash)=>{
                    if(err){
                        res.status(500).send({error:err})
                    }else{
                           const user = new User({
                               email:email,
                               password:hash
                           })
                           await user.save();
                          res.status(201).send({success:'Signed up'});
                         const id = user._id;
                         const token = jwt.sign(id.toString(),'mylovelifeistrash')
                          res.status(201).send({user,token});
                    }
                })
       }else{
           res.status(400).send({err:`Email ${email} already exist`})
       }
    }catch(err){
        console.log(err);
        res.status(401).send(err)
    }
   })

   app.listen(3000,()=>{
       console.log('server started at port 3000')
   })
