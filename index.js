const server = require('./server');

const port = 8000

server.listen(port, () => {
    console.log(`== Server is running on port ${port} ==`)
})