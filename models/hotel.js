class Hotel {
  constructor(name, city) {
    this.name = name;
    this.city = city;
    this.reviews = [];
  }

  reviewCount() {
    return this.reviews.length
  }

  rating() {
    if (this.reviews.length == 0) { return 0 }
    return this.reviews.reduce((sume, review) => sume + review.rating, 0) / this.reviews.length;
  }

  ratingAsStars() {
    if (this.rating() == undefined) {
      return ''
    } else {
      return '⭐️'.repeat(this.rating())
    }
  }

  urlSlug() {
    return `${this.name.toLowerCase().replace(' ', '_')}_${this.city.toLowerCase().replace(' ', '_')}`
  }

  addReview(review) {
    this.reviews.push(review)
  }

}

module.exports = Hotel
