const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;


app.use(cors({
    origin:"*"
}));
app.use(express.json())




const uri = "mongodb+srv://cleanCopro:lmeg5LxzdiyLVl9Y@cluster0.l3qegtp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const servicesCollection = client.db("clean-co").collection("service");
        /* 
         get/get-services => all data
         post/add-services => create new data 
         put/update-services => modify a data on collection
         delete/delete-services => delete a data from collection 
        
        */

        app.get('/get-services' , async(req , res)=>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        });

        app.post('/add-services', async(req , res)=>{
            const data = req.body;
            const result = await servicesCollection.insertOne(data);
            res.send(result);
        })

        // // app.post("/add-services", async(req , res)=>{
        // //    try{
        // //     const data = req.body;
        // //     const result = await servicesCollection.insertOne(data);
        // //     res.send({status : true , result:result});
        // //    }
        // //    catch(error){
        // //     res.send({status: false , error})
        // //    }

        // })

    }
    finally{

    }
}
run().catch(console.dir);


app.get('/', (req , res)=>{
    res.send('server is running')
})

app.listen(port , ()=>{
    console.log('ok i am ready and my port is',port);
})

// cleanCopro
// lmeg5LxzdiyLVl9Y