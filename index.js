const express = require("express")
const app = express()
const ejs = require("ejs")
const fs = require("fs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view-engine", "ejs")

app.get("/",(req,res)=>{
    fs.readdir("./files", "utf-8", (err, data)=>{
        res.render("createfile.ejs",{files: data})
    })
}) 
app.post("/create",(req,res)=>{
    if(req.body.myname !== "" && req.body.mytext !== ""){
        fs.writeFile(`./files/${req.body.myname.split(" ").join("")}.txt`, `${req.body.mytext}`, (err)=>{
        })
        res.redirect("/")
    }
    else{
        res.redirect("/")
    }
})  
app.get("/files/:filename", (req,res)  =>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data)=>{
        res.render("readfile.ejs", { filename: req.params.filename, finaldata: data})   
    })   
}) 
app.get(`/editname/:editname`, (req,res) => {
    res.render("editname.ejs", {oldfilename: req.params.editname}) 
})
app.get("/delete/:filename", (req,res)=>{
    fs.unlink(`./files/${req.params.filename}`, (err)=>{
    })
    res.redirect("/")
})
app.get(`/updatefiledata/:filename`, (req,res) => {
    fs.readFile(`./files/${req.params.filename}`, (err,data)=>{
        res.render("updatefile.ejs", {filename : req.params.filename, filedata: data}) 
    }) 
})
app.post("/newfilename", (req,res)=>{   
    if(req.body.newfilename !== ""){
        fs.rename(`./files/${req.body.filename}`, `./files/${req.body.newfilename.split(" ").join("")}.txt`, (err)=>{
            res.redirect("/")  
        })
         }
        else{
            res.redirect("/")
        }
})
app.post("/updatedata", (req,res)=>{ 
    fs.writeFile(`./files/${req.body.filename}`, `${req.body.updatedata}`, (err)=>{})
    res.redirect("/")
})
app.listen(3000, ()=>{  
    console.log("server chala"); 
})