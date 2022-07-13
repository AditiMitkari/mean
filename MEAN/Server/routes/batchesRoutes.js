express = require("express");
batchesModel = require("../models/batches");

const app = express();

app.get("/batches", async (request, response) => {
  const batches = await batchesModel.find({});
  try 
  {
    response.send(batches);
  } 
  catch (error) 
  {
    response.status(500).send(error);
  }
});

app.post("/batches", async (request, response) => {
    const batches = new batchesModel(request.body);
    try 
    {
      await batches.save();
      response.send(batches);
    }
     catch (error) 
     {
      response.status(500).send(error);
    }
  });

  app.delete("/batches/:id", async(request, response) =>{
    try
    {
        batches = await batchesModel.findByIdAndDelete(request.params.id);
        if(!batches)
        { 
            response.status(404).send("There is no such batch");
        }
    }
    catch(error)
    {
        response.status(500).send(error);
    }
  })

  app.patch("/batches/:id", async(request, response)=>{
    try
    {
        await batchesModel.findByIdAndUpdate(request.params.id, request.body);
        await batchesModel.save();
    }
    catch(err)
    {
      response.status(500).send(err);
    }
  })

module.exports = app;

// CRUD application

// C -> Create
// Endpoint : post
// Mongodb function : save()
// insert into tablename

// R -> Read
// Endpoint : get
// Mongodb function : find()
// select * from tablename

// U -> Update
// Endpoint : patch
// Mongodb function : findByIdAndUpdate
// update tablename set duraion  = ___ where id = ____; 

// D -> Delete
// Endpoint : delete
// Mongodb function : findByIdAndDelete
// delete from tablename where id = ____;