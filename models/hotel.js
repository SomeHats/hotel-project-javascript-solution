class Hotel {
  constructor(name, city) {
    this.name = name
    this.city = city
    this.reviews = []
  }

  reviewCount() {
    return this.reviews.length
  }

  rating() {
    if (this.reviews.length == 0) {
      return 0
    }

    var total = 0
    for (var review of this.reviews) {
      total = total + review.rating
    }

    var average = total / this.reviews.length
    return average
  }

  ratingAsStars() {
    return '⭐️'.repeat(this.rating())
  }

  urlSlug() {
    var nameSlug = this.name.toLowerCase().replace(' ', '_')
    var citySlug = this.city.toLowerCase().replace(' ', '_')
    return nameSlug + '_' + citySlug
  }

  addReview(review) {
    this.reviews.push(review)
  }

  toJSON() {
    return {
      name: this.name,
      city: this.city,
      reviewCount: this.reviewCount(),
      rating: this.rating(),
      ratingAsStars: this.ratingAsStars(),
      urlSlug: this.urlSlug(),
      reviews: this.reviews
    }
  }
}

module.exports = Hotel
