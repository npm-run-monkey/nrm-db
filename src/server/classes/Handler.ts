// Default
import _Pool from "./Pool";

// Helper
import { Pool, QueryResult } from "pg";

class Handler 
{
    private pool: Pool;

    constructor()
    {
        this.pool = _Pool.pool;
    }

    // Used for queries without a return value
    public executeQuery = async (query: string): Promise<void> =>
    {
        const conn = await this.pool.connect();

        try
        {
            conn.query(query);
        }
        catch(e)
        {
            console.error(`[DB] - Error during execution of query ${query} Error: ${e}`);
        }
        finally
        {
            conn.release();
        }
    }

    // Used for queries with a return value
    public executeAsyncQuery = <T>(query: string): Promise<QueryRes<T>> =>
    {
        return new Promise( async (res, rej) =>
        {
            const conn = await this.pool.connect();
            const start = GetGameTimer();

            try 
            {
                const { rowCount, rows }: QueryResult<T> = await conn.query(query);

                res({rowCount, rows});
                console.log(`[DB] - Query ${query} took around ${GetGameTimer() - start}ms to complete`);
            }
            catch(e)
            {
                console.error(`[DB] - Error during execution of query ${query} Error: ${e}`);
            }
            finally
            {
                conn.release();
            }
        });
    }
}

export default new Handler();