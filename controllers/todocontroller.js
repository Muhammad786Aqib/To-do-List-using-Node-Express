var bodyParser= require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongobd://test:test@ds017195.malab.com:17195.mlab.com:17195/todo');

var todoSchema = new mongoose.Schema({
    item=String
});

var Todo = mongoose.model ('Todo',todoSchema);
//var itemOne= Todo({item:'get flowers'}).save(function(err){
  //  if(err) throw err;
    //console.log('item saved')
//});


var data =[{item:'get Milk'},{item:'get cow'},{item:'get A goat'}];
var urlencodedParser=bodyParser.urlencoded({ extended: false });

module.exports=function(app){

    app.get('/todo',function(req,res){
        Todo.find({item:'buy flowers',function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});

        }});
       
    
    });
    app.post('/todo',urlencodedParser,function(req,res){
        var todoItem = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
         });
        
    });
    app.delete('/todo',function(req,res){
        Todo.find({item:req.params.item.replace(/\-/g,"")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        })
        

    });


}