import Handler from "classes/Handler";

global.exports('executeQuery', (query: string) =>
{
    Handler.executeQuery(query);
});

global.exports('executeAsyncQuery', <T>(query: string): Promise<QueryRes<T>> =>
{
    return new Promise(async (res) => 
    {
        res(await Handler.executeAsyncQuery(query));
    });
});