var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var myList = new Schema({
    Brand: {
        type: String,
        require: true
    },
    Part: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    Price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    comments: [String],
     
    insurance : {
        type: Number,
        require: true
    },
    delivery : {
        type: Number,
        require: true
    },
    
});
module.exports = mongoose.model("myList", myList);