import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/';
let client: MongoClient | undefined;

async function main(): Promise<void> {
  client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to DB!');
  } catch (e) {
    console.log(e);
  } finally {
    // await client.close();
  }
}

main().catch(console.error);

export { client };
