var bodyParser =require ("body-parser");

var express=require("express");

var apiRouter= express.Router();

var mogoose=require("mongoose");

var schema =require("./schema.js");

apiRouter.get("/",function(req,res){
    schema.find({},function(err,result){
        if(err){
            res.status(500).send(err);
            
        }
        else{
            res.status(200).send({succes:true,data:result});
        }
    });
});

apiRouter.get("/:id",function(req,res){
    schema.findById(req.params.id,function(err,result){
       if(err){
           res.status(500).send(err);
       }
        else if(result==undefined){
            res.status(404).send(err);
        }
        else{
            res.status(200).send({succes:true,data:result});
        }
    });
});

apiRouter.post("/",function(req,res){
    var newItem =new schema(req.body);
    newItem.save(function(err,result){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send({"messsage":"success"});
        }
    });
});
//post by id

apiRouter.post("/:id",function(req,res){
    var comment=req.body.comment;
    schema.findOne({
        _id:req.params.id
    },function(err,data){
        if(err){
            res.status(500).send({
                message:"err"
            });
        }
        else{
            data.comments.push(comment);
            data.save(function(err,data){
                if(err){
                    res.status(500).send({message:"err"});
                }
                else{
                    res.status(200).send({
                       "data":data 
                    });
                }
            });
        }
    });
    
});

apiRouter.delete("/:id",function(req,res){
    schema.findById(req.params.id,function(err,result){
        if(err){
            res.status(500).send(err);
        }
        else if(result==undefined){
            res.status.send(err);
        }
        else{
            result.remove();
            res.status(200).send({"message":"item deleted"});
        }
    });
});

apiRouter.put("/:id",function(req,res){
   schema.findById(req.params.id,function(err,result){
       if(err){
           res.status(500).send(err);
       }
       else if(result==undefined){
           res.status(404).send(err);
       }
       else{
            for(key in req.query) {
                
                result[key] = req.query[key]
            }
            result.save();
            res.status(200).send({message: "Item has been updated"});
       }
   }); 
});
apiRouter.put("/order/:id",function(req,res){
   schema.findById(req.params.id,function(err,result){
       if(err){
           res.status(500).send(err);
       }
       else if(result==undefined){
           res.status(404).send(err);
       }
       else{
           
            for(key in req.query) {
                
                result[key] = req.query[key]
            }
            result.save();
            res.status(200).send({message: "Item has been updated"});
       }
   }); 
});

module.exports=apiRouter;