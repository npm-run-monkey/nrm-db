import 'dotenv/config'
import { Pool } from "pg";

class _Pool {
    public pool: Pool;

    constructor()
    {
        this.pool = this.createPool();
        this.testPoolConnection();
    }

    private testPoolConnection = async (): Promise<void> =>
    {
        try
        {
            if (await this.pool.connect())
            {
                console.log(`[DB] - Succesfully established connection to the database!`);
            }
        }
        catch(e)
        {
            console.error(`[DB] - Error during connection testing: ${e}`);
        }
    }

    private createPool = (): Pool => {
        return new Pool({
            host: process.env.PRIVATE_HOST,
            port: Number(process.env.PRIVATE_PORT),
            user: process.env.PRIVATE_USER,
            password: process.env.PRIVATE_PASSWD,
            database: process.env.PRIVATE_DATABASE
        });
    }
}

export default new _Pool();