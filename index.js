const http = require("http");
const PORT = 3001

const app = http.createServer((request,response)=>{
    response.writeHead(200, {'content-type': "text/plain"});
    response.end("Hello World!");
})

app.listen(PORT)
console.log(`\x1b[32mserver is running on the port ${PORT}\x1b[0m`);
