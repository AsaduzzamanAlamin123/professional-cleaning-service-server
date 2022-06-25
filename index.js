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

        app.get('/services' , async(req , res)=>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

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