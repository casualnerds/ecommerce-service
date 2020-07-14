if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config();
};

const http = require('http');

const PORT = process.env.PORT || 3000;
const app = require('../app');

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));