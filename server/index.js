const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); 
const { scopePerRequest } = require('awilix-express');
const container = require('./config/container');


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(scopePerRequest(container));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const utilizatoriRoutes = require('./routes/utilizatoriRoute');
const cursuriRoutes = require('./routes/cursuriRoute');
const abonamenteRoutes = require('./routes/abonamenteRoute');
const recenziiRoutes = require('./routes/recenziiRoute');
const evaluariRoutes = require('./routes/evaluariRoute');
const drepturiRoutes = require('./routes/drepturiRoute');
const participariRoutes = require('./routes/participariRoute');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/testRoute');
const modulesRoutes = require('./routes/modulesRoute');

app.use('/utilizatori', utilizatoriRoutes);
app.use('/cursuri', cursuriRoutes);
app.use('/abonamente', abonamenteRoutes);
app.use('/recenzii', recenziiRoutes);
app.use('/evaluari', evaluariRoutes);
app.use('/drepturi', drepturiRoutes);
app.use('/participari', participariRoutes);
app.use('/auth', authRoutes);
app.use('/test', testRoutes);
app.use('/modules', modulesRoutes);

const sequelize = require('./db');

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(7500, () => {
            console.log("Serverul rulează pe portul 7500");
        });
    } catch (error) {
        console.error('Eroare la conectarea la baza de date:', error);
    }
};

startServer();
