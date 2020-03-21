const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "todo_mongodb";
const url = "mongodb+srv://todoapp:todoapp@cluster0-evom8.mongodb.net/test?retryWrites=true&w=majority";
const mongoOptions =  {useNewUrlParser : true, useUnifiedTopology: true};

const state =  {
    db : null
};

const connect = (cb)=>{
    if(state.db)
        cd();
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err)
                cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }
        })
    }
}

const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

const getDB =()=>{
    return state.db;
}
module.exports = {getDB,connect,getPrimaryKey};