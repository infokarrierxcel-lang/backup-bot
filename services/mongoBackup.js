import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

export const backupMongoDB = async (backupDir) => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();

  const db = client.db(process.env.DB_NAME);
  const collections = await db.listCollections().toArray();

  for (const col of collections) {
    const data = await db.collection(col.name).find().toArray();
    fs.writeFileSync(
      path.join(backupDir, `${col.name}.json`),
      JSON.stringify(data, null, 2)
    );
  }

  await client.close();
};
