const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {User}=require('../models');
const JWT_SECRET=process.env.JWT_SECRET||'dev_secret';

router.post('/signup',async(req,res)=>{try{const {name,email,password}=req.body;if(!email||!password)return res.status(400).json({error:'Email & password required'});if(await User.findOne({where:{email}}))return res.status(400).json({error:'Email used'});const passwordHash=bcrypt.hashSync(password,10);const user=await User.create({name,email,passwordHash});const token=jwt.sign({id:user.id},JWT_SECRET,{expiresIn:'7d'});res.json({token,user:{id:user.id,name,email}});}catch(e){res.status(500).json({error:'Signup failed'})}});

router.post('/login',async(req,res)=>{try{const {email,password}=req.body;const u=await User.findOne({where:{email}});if(!u||!bcrypt.compareSync(password,u.passwordHash))return res.status(400).json({error:'Invalid creds'});const token=jwt.sign({id:u.id},JWT_SECRET,{expiresIn:'7d'});res.json({token,user:{id:u.id,name:u.name,email}});}catch(e){res.status(500).json({error:'Login failed'})}});

module.exports=router;