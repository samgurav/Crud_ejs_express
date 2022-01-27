const express=require('express');
const app=express();
const PORT=7799;
const fs=require('fs')
const ejs=require('ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    let data=require('./post.json')
    // res.json({"err":0,'pdata':data.posts})
    res.render('form_data',{postData:data.posts})
})

app.get('/addpost', (req, res) => {
    res.render('layout.ejs')
});

app.post('/postdata', function(req, res){
    // res.send(req.body)
    fs.readFile('./post.json', 'utf-8', function(err, data) {
        var arrayOfObjects=[]
        if (err) throw err
    
        arrayOfObjects = JSON.parse(data)
        console.log(arrayOfObjects)
    
        arrayOfObjects.posts.push({
            title:req.body.title,
            des:req.body.des,
            id:arrayOfObjects.posts.length +1,  
        })
        // console.log(arrayOfObjects)
        fs.writeFile('./post.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
        
    })
    res.redirect('/')

});

app.get(`/updatepost/:id`,(req,res)=>{
    fs.readFile('./post.json', 'utf-8', function(err, data) {
        var postData=[]
        if (err) throw err
        postData = JSON.parse(data)
        console.log(postData)
        res.render('update',{postData:postData.posts[req.params.id],index:req.params.id})
    })
})

app.post(`/fupdatepost/:id`,(req,res)=>{
    fs.readFile('./post.json', 'utf-8', function(err, data) {
        var arrayOfObjects=[]
        if (err) throw err
    
        arrayOfObjects = JSON.parse(data)
        console.log(req.body)
        
        arrayOfObjects.posts[req.params.id].title=req.body.title,
        arrayOfObjects.posts[req.params.id].des=req.body.des,
       
        console.log(arrayOfObjects)
        fs.writeFile('./post.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
        
    })
    res.redirect('/')
})

app.get(`/deletepost/:id?`,(req,res)=>{
    fs.readFile('./post.json', 'utf-8', function(err, data) {
        let arr=JSON.parse(data)
        //  empData=arr.emp
         arr.posts.splice(req.params.id,1)
        //  console.log(empData);
         fs.writeFile('./post.json', JSON.stringify(arr), 'utf-8', function(err) {
          if (err) throw err
          res.end();
          })
          
        })
        res.redirect('/');
    // res.json({"err":0,"msg":"Post Deleted!!"});
})

app.listen(PORT,(err)=>{
    if (err) throw err
    console.log(`Work on ${PORT}`);
})
