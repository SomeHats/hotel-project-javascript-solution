const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));
sinon = require('sinon')

const Hotel = require('../models/hotel')
const Review = require('../models/review')

describe('Hotel', () => {
  let hotel = new Hotel("Hilton Metropole", "London")

  it('instantiates properly', () => {
    expect(hotel.name).to.eql("Hilton Metropole")
    expect(hotel.city).to.eql("London")
    expect(hotel.reviews).to.eql([])
    expect(hotel.reviewCount()).to.eql(0)
    expect(hotel.rating()).to.eql(0)
    expect(hotel.ratingAsStars()).to.eql('')
  });

  it('exposes a URL slug', ()=> {
    expect(hotel.urlSlug()).to.equal("hilton_metropole_london")
  })

  it('allows the addition of hotels', ()=> {
    let review1 = new Review(5, "Excellent hotel, very clean", "2018-12-17")
    let review2 = new Review(1, "Terrible hotel, smelled of mice", "2018-01-01")

    hotel.addReview(review1)
    hotel.addReview(review2)

    expect(hotel.reviews.length).to.equal(2)
    expect(hotel.reviewCount()).to.equal(2)
    expect(hotel.rating()).to.equal(3)
    expect(hotel.ratingAsStars()).to.equal("⭐️⭐️⭐️")
  })
});

