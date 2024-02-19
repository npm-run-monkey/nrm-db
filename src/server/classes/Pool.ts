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
            host: "158.220.109.125",
            port: Number(5432),
            user: "root",
            password: "pyjyulK1223pyjhXX",
            database: "devserver"
        });
    }
}

export default new _Pool();