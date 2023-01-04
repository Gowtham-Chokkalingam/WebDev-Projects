const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = 8080; 

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`)
  })