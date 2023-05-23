const path = require("path");
require('dotenv').config({path: path.join(__dirname, process.env.NODE_ENV==="production" ? '.env' : '.env.development') });
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const {checkBasicTypes} = require("./utils/utils");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/static',express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        await checkBasicTypes();
        app.listen(PORT, () => console.log(`Сервер запущен на порту: ${PORT}`));
    } catch (e) {
        console.log(e);
        console.log(process.env.DB_HOST, process.env.DB_PORT);
    }
})();
