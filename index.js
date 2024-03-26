const express = require("express");
const app =express();
const port = 3000;
const bp = require("body-parser");
const qr = require("qrcode")
const path = require("path")

app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req, res) => {
    let src = "/blank.jpg";
    return res.render("index", {src});
});

app.post("/", (req,res)=>{
    const url = req.body.url;
    if(url.length === 0) {
        let src = "/blank.jpg";
        return res.render("index",{src});}
    qr.toDataURL(url,(err, src) => {
        if(err) res.send("error occured");
        res.render("index", {src});
    })
});
app.listen(port, ()=>console.log("listning 3000"));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));