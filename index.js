import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize an array to store posts
let posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/index", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/about", (req,res)=>{
    res.render("about.ejs");
})

app.post("/delete",(req, res)=>{
    let item=req.body["text-posted"];
    const indx=posts.indexOf(item);
    posts.splice(indx);
    res.redirect("/");
});


app.post("/", (req, res) => {
    console.log(req.body); // Log the entire request body to the console

    let item = req.body["text"];
    let id = req.body["id"];

    if (item) {
        posts.push(item);
    }

    let textbody = req.body["textedit"];
    if (textbody!==undefined) {
        posts[id] = textbody;
    } else if(textbody===undefined) {
        posts[id]=item;
    }

    res.render("index.ejs", { posts, index: id });
});
app.get("/blog",(req,res)=>{
    res.render("blog.ejs")
})

app.post("/blog",(req, res)=>{
    let currentPost = req.body["textEdit"];
    let index = req.body["id"];
    let dataEdit = posts[Number(index)];
    posts[index]=currentPost;
    res.render("blog.ejs",{dataToEdit: dataEdit, id: index})
});

app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
});

app.listen(port, () => {
    console.log("Running on 3000");
});