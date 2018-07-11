const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const Hotel = require('./models/hotel')
const Review = require('./models/review')
const HotelCollection = require('./models/hotelCollection')

const port = process.env.PORT || 3000;

//////////////////////
// Set up Seed Data //
//////////////////////

const hc = new HotelCollection

let hotel1 = new Hotel("Hilton Metropole", "London")
hotel1.addReview(new Review(5, "Excellent hotel, very clean", "2018-12-17"))
hotel1.addReview(new Review(1, "Terrible hotel, smelled of mice", "2018-01-01"))
hc.addHotel(hotel1)

let hotel2 = new Hotel("Double Tree", "Dublin")
hc.addHotel(hotel2)

////////////
// Routes //
////////////

app.get('/', (req, res) => {
  res.statusCode = 404
  res.send('Not Found. Try /hotels')
})

// READ all Hotels
app.get('/hotels', (req, res) => {
  res.statusCode = 200
  allHotels = hc.sortedHotels()
  res.send(allHotels)
})

// CREATE a hotel
app.post('/hotels', (req, res) => {
  name = req.body.name
  city = req.body.city

  if (name == undefined || city == undefined) {
    res.statusCode = 400
    res.send('Bad request. Boo')
  } else {
    newHotel = new Hotel(name, city)
    hc.addHotel(newHotel)

    res.statusCode = 200
    res.send(newHotel)
  }
})

// READ a single Hotel
app.get('/hotels/:slug', (req, res) => {
  hotel = hc.find(req.params.slug)

  if (hotel == undefined) {
    res.statusCode = 404
    res.send('Hotel Not Found')
  } else {
    res.statusCode = 200
    res.send(hotel)
  }
})

// UPDATE a hotel's details
app.put('/hotels/:slug', (req, res) => {
  name = req.body.name
  city = req.body.city
  hotel = hc.find(req.params.slug)

  if (name == undefined || city == undefined || hotel == undefined) {
    res.statusCode = 400
    res.send('Bad request, or hotel not found')
  } else {
    hotel.name = name
    hotel.city = name

    res.statusCode = 200
    res.send(hotel)
  }
})

// DESTROY a Hotel
app.delete('/hotels/:slug', (req, res) => {
  deletedHotel = hc.delete(req.params.slug)

  if (deletedHotel == undefined) {
    res.statusCode = 404
    res.send('Hotel Not Found')
  } else {
    res.statusCode = 204
    res.send
  }
})

// READ reviews for a hotel
app.get('/hotels/:slug/reviews', (req, res) => {
  hotel = hc.find(req.params.slug)

  if (hotel == undefined) {
    res.statusCode = 404
    res.send('Hotel Not Found')
  } else {
    res.statusCode = 200
    res.send(hotel.reviews)
  }
})

// CREATE a review
app.post('/hotels/:slug/reviews', (req, res)=> {
  hotel = hc.find(req.params.slug)
  rating = req.body.rating
  text = req.body.text
  date = (new Date).toString()

  review = new Review(rating, text, date)
  hotel.addReview(review)

  // TODO: We should really do some checking in here to make sure it saves ok.
  res.statusCode = 200
  res.send(review)
})

// UPDATE a review
app.put('/hotels/:slug/reviews/:reviewId', (req, res)=> {
  // TODO: Implement this method.
  res.statusCode = 501
  res.send('Not Implemented')
})

// DESTROY a Review
app.delete('/hotels/:slug/reviews/:reviewId', (req, res) => {
  // TODO: Implement this method.
  res.statusCode = 501
  res.send('Not Implemented')
})

// Dissalowed Routes
app.put('/hotels', (req, res) => { res.statusCode = 405 })
app.delete('/hotels', (req, res) => { res.statusCode = 405 })
app.post('/hotels/:slug', (req, res) => { res.statusCode = 405 })


// RUN SERVER
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
