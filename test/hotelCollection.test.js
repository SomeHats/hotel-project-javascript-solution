const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-datetime'))

const HotelCollection = require('../models/hotelCollection')
const Hotel = require('../models/hotel')
const Review = require('../models/review')

describe('HotelCollection', () => {
  it('instantiates properly', () => {
    let hotel1 = new Hotel('Hilton Metropole', 'London')
    let hotel2 = new Hotel('Crown Plaza', 'Leeds')

    c = new HotelCollection()
    expect(c.hotels).to.eql([])

    c.addHotel(hotel1)
    c.addHotel(hotel2)

    expect(c.hotels.length).to.equal(2)
  })

  it('raises an error if hotels are overwritten', () => {
    expect(function() {
      c.hotels = ['some', 'nonsense']
    }).to.throw('Cannot overwrite hotels array!')
  })

  it('returns sorted hotels', () => {
    c = new HotelCollection()
    c.addHotel(new Hotel('Hilton Metropole', 'London')) // Avg rating = 0

    hotel = new Hotel('Crown Plaza', 'Leeds')
    hotel.addReview(new Review(5, 'V Good', '2018-01-01'))
    c.addHotel(hotel) // Avg Rating 5

    sorted = c.sortedHotels()
    expect(sorted[0].rating()).to.eql(5)
    expect(sorted.slice(-1)[0].rating()).to.eql(0)
  })

  it('Allows searching for a hotel by slug', () => {
    c = new HotelCollection()
    c.addHotel(new Hotel('Hilton Metropole', 'London'))
    c.addHotel(new Hotel('Crown Plaza', 'Leeds'))

    expected_hotel = c.find('hilton_metropole_london')
    expect(expected_hotel.name).to.equal('Hilton Metropole')
    expect(expected_hotel.city).to.equal('London')
  })

  it('Allows removal of a hotel by slug', () => {
    c = new HotelCollection()
    c.addHotel(new Hotel('Hilton Metropole', 'London'))
    c.addHotel(new Hotel('Crown Plaza', 'Leeds'))

    expected_hotel = c.delete('hilton_metropole_london')
    expect(expected_hotel.name).to.equal('Hilton Metropole')
    expect(expected_hotel.city).to.equal('London')
    expect(c.hotels.length).to.equal(1)
    expect(c.hotels[0].name).to.equal('Crown Plaza')
  })
})
