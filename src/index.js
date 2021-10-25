//Extern Libs
const express = require('express');
const hbs = require('hbs');
const path = require('path');

//Routers
const pageRouters = require('./routers/pageRouters');
const analysisRouters = require('./routers/analysisRouters');
const overviewRouters = require('./routers/overviewRouters');

//Paths
const partialsPath = path.join(__dirname + '/../templates/partials');
const viewsPath = path.join(__dirname + '/../templates/views');
const publicPath = path.join(__dirname + '/../public');
//Instanciate app
const app = express();

//App settings
app.use(express.json());
app.use('/public',express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(pageRouters);
app.use(analysisRouters);
app.use(overviewRouters);

//Hbs settings
hbs.registerPartials(partialsPath);

//Connect to mongoDB
require('./db/mongoose');

//Run app
app.listen(process.env.PORT,()=>{
    console.log('App listening on port ' + process.env.PORT);
});