const chai = require('chai');
const expect = chai.expect;

var Hotel = require('../models/hotel')

describe('Hotel', () => {
  it('instantiates properly', () => {
    let hotel = new Hotel("Hilton Metropole", "London")
    expect(hotel.name).to.eql("Hilton Metropole")
    expect(hotel.city).to.eql("London")
    expect(hotel.reviews).to.eql([])
    expect(hotel.reviewCount()).to.eql(0)
    expect(hotel.rating()).to.eql(0)
    expect(hotel.ratingAsStars()).to.eql('')
  });

  it('exposes a URL slug', ()=> {
    let hotel = new Hotel("Hilton Metropole", "London")
    expect(hotel.urlSlug()).to.equal("hilton_metropole_london")
  })
});
