const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views location
app.set('view engine', 'hbs');      //задаємо тип крч протсо пиши це це стала хєрня
app.set('views', viewsPath);        //пишемо шлях до файлу з hbs динамічними сторінками
hbs.registerPartials(partialsPath); //реєструєм фрагменти розмітки html які часту використовуються

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get("", (req,res) => {
    res.render('index', {  //статичка хрэнь в expressjs де першим йде стрінг з назвою файла розширення hbs, a далі йдуть дані які в index можна юзати
        title: 'Weather App',           //також ці дані передаються в partials
        name: "Andrew"
    });
});

app.get("/about", (req,res) => {
   res.render('about', {
       src: 'https://f.v1.n0.cdn.getcloudapp.com/items/0L2l2K3f3e1H2o1O3p0f/robot.png',
       name: "Fedak",
       title: "About me"
   })
});

app.get('/help', (req, res) => {
   res.render('help', {
       typeOfHelp: "charity",
       money: "3 billion",
       title: "Help page",
       name: "Andrew"
   })
});

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',             //automaticly sringify data to JSON format
//         age: 27
//     }])
// });


app.get("/weather", (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        });
    });
});

app.get('/products', (req,res) => {//req.query вмішає в себе object { search: 'game', rating: '5' } ссилки
                                    // "localhost:3000/products?search=game&rating=5", в ній знаходяться
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
});

app.get("/help/*", (req, res) => {
    res.render('error-page', {
        title: '404',
        errorMessage: "Help article not found"
    })
});

app.get('*', (req, res) => {
    res.render('error-page', {
        title: "404",
        errorMessage: "Page not found"
    })
});


app.listen(port, () => {
    console.log("Server is up on port " + port)
});