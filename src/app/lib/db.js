const { username, password, dbName } = process.env;
export const connectionSrt = `mongodb+srv://${username}:${password}@cluster0.ynieqkf.mongodb.net/${dbName}?retryWrites=true&w=majority`;