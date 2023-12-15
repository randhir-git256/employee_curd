
const express = require('express');
const server = express();
const routes = require('./routes/routes');
const cors = require('cors');
const sequelize = require('./database/connection');


require('./src/user/userModel');

server.use(cors());
server.use(express.json());
server.use(routes);


server.use((req, res, next) => {
    res.status(404).json({ status: false, message: 'Invalid route' });
});


server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: false, message: 'Internal server error' });
});


sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected!');
        server.listen(8000, function (error) {
            if (error) {
                console.log("Error starting the server:", error);
            } else {
                console.log("Server started on port 8000");
            }
        });
    })
    .catch(error => console.error('Error syncing database:', error));
