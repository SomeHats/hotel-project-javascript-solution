var chai = require('chai')
var expect = chai.expect
chai.use(require('chai-datetime'))

var HotelCollection = require('../models/hotelCollection')
var Hotel = require('../models/hotel')
var Review = require('../models/review')

describe('HotelCollection', () => {
  it('instantiates properly', () => {
    var hotel1 = new Hotel('Hilton Metropole', 'London')
    var hotel2 = new Hotel('Crown Plaza', 'Leeds')

    var c = new HotelCollection()
    expect(c.hotels).to.eql([])

    c.addHotel(hotel1)
    c.addHotel(hotel2)

    expect(c.hotels.length).to.equal(2)
  })

  it('returns sorted hotels', () => {
    var c = new HotelCollection()
    c.addHotel(new Hotel('Hilton Metropole', 'London')) // Avg rating = 0

    var hotel = new Hotel('Crown Plaza', 'Leeds')
    hotel.addReview(new Review(5, 'V Good', '2018-01-01'))
    c.addHotel(hotel) // Avg Rating 5

    var sorted = c.sortedHotels()
    expect(sorted[0].rating()).to.eql(5)
    expect(sorted.slice(-1)[0].rating()).to.eql(0)
  })

  it('Allows searching for a hotel by slug', () => {
    var c = new HotelCollection()
    c.addHotel(new Hotel('Hilton Metropole', 'London'))
    c.addHotel(new Hotel('Crown Plaza', 'Leeds'))

    var expected_hotel = c.find('hilton_metropole_london')
    expect(expected_hotel.name).to.equal('Hilton Metropole')
    expect(expected_hotel.city).to.equal('London')
  })

  it('Allows removal of a hotel by slug', () => {
    var c = new HotelCollection()
    c.addHotel(new Hotel('Hilton Metropole', 'London'))
    c.addHotel(new Hotel('Crown Plaza', 'Leeds'))

    var expected_hotel = c.delete('hilton_metropole_london')
    expect(expected_hotel.name).to.equal('Hilton Metropole')
    expect(expected_hotel.city).to.equal('London')
    expect(c.hotels.length).to.equal(1)
    expect(c.hotels[0].name).to.equal('Crown Plaza')
  })
})
