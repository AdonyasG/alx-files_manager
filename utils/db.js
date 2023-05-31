import mongodb from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.client = new mongodb.MongoClient(`mongodb://${this.host}:${this.port}`, { useUnifiedTopology: true });
    this.client.connect((err) => {
      if (err) console.log(err);
      else console.log(`DBClient connected to ${this.host}:${this.port}`);
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.client.db(this.database).collection('users');
    return users.countDocuments();
  }

  async nbFiles() {
    const files = this.client.db(this.database).collection('files');
    return files.countDocuments();
  }
}
const dbClient = new DBClient();
export default dbClient;
