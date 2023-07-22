import express,  { Request, Response } from 'express';
import cors from 'cors';
import { client } from '../Database/MongoConnection.js';
import * as dotenv from 'dotenv';
import { MongoClient, Db, Collection } from 'mongodb';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req:any,res:any) => {
  res.send('Hare Krishna');
})

async function getChartData(): Promise<any> {
  const db: Db = client.db("test");
  const collection: Collection<any> = db.collection("chartData");
  const response: any = await collection.find({}).toArray();
  return response;
}

app.get('/get', async (req: Request, res: Response) => {
  try {
    console.log('here')
    const response = await getChartData();
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});

app.post('/insert', async (req: Request, res: Response) => {
  try {
    const db: Db = client.db("test");
    const collection: Collection<any> = db.collection("chartData");
    const response: any = await collection.insertOne({
        "name": "GlobalCorp",
        "xAxisData": req.body.xAxisData,
        "yAxisData": req.body.yAxisData
    });
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});


const PORT = 3001;
app.listen(PORT || process.env.PORT, (req: any,res: any) => {
  console.log(`Server is running on Port ${PORT}`)
})
