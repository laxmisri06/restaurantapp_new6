const http = require("http"); 
const app = require("../Backend/app");
const server = http.createServer(app);

server.listen(3000, ()=>{
   console.log("Check port Number 3000");
});