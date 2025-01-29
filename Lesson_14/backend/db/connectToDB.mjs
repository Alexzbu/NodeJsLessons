import config from '../config/default.mjs'
import pkg from 'pg'

const { Pool } = pkg

async function connectToDB() {
   try {
      const pool = new Pool({
         host: config.db.host,
         user: config.db.user,
         password: config.db.password,
         database: config.db.database,
         port: config.db.port || 5432
      });

      console.log('Successfully connected to PostgreSQL');
      return pool;
   } catch (err) {
      console.error('Error connecting to PostgreSQL:', err);
   }
}

const pool = await connectToDB()

export default pool

