import mongoose from 'mongoose';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: Promise<typeof mongoose> | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<typeof mongoose> {
    if (this.connection) {
      return this.connection;
    }

    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI not set in environment variables");
    }

    const options = {
      bufferCommands: false,
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      maxIdleTimeMS: 30000,
    };

    try {
      this.connection = mongoose.connect(mongoUri, options);
      const result = await this.connection;
      
      mongoose.connection.on('error', () => {
        this.connection = null;
      });

      mongoose.connection.on('disconnected', () => {
        this.connection = null;
      });

      return result;
    } catch (error) {
      this.connection = null;
      throw error;
    }
  }
}

// Export singleton instance
export default DatabaseConnection.getInstance();

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});