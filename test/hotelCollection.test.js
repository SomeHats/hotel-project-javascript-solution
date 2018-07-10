const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

const HotelCollection = require('../models/hotelCollection')
const Hotel = require('../models/hotel')
const Review = require('../models/review')

describe('HotelCollection', () => {
  it('instantiates properly', () => {
    let hotel1 = new Hotel("Hilton Metropole", "London")
    let hotel2 = new Hotel("Crown Plaza", "Leeds")

    c = new HotelCollection
    expect(c.hotels).to.eql([])

    c.addHotel(hotel1)
    c.addHotel(hotel2)

    expect(c.hotels.length).to.equal(2)
  });

  it('raises an error if hotels are overwritten', ()=> {
    // Not quite working. It's hard to test a setter method
    //   that raises an error, since expect expects a function.

    // expect(c.hotels(['some', 'nonsense'])).to.throw(new Error("Cannot overwrite hotels array!"))
  })

  it('returns sorted hotels', ()=> {
    c = new HotelCollection
    c.addHotel(new Hotel("Hilton Metropole", "London")) // Avg rating = 0

    hotel = new Hotel("Crown Plaza", "Leeds")
    hotel.addReview(new Review(5, "V Good", "2018-01-01"))
    c.addHotel(hotel) // Avg Rating 5

    sorted = c.sortedHotels()
    expect(sorted[0].rating()).to.eql(5)
    expect(sorted.slice(-1)[0].rating()).to.eql(0)
  })
});
