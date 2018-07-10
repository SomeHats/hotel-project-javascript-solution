class Hotel {
  constructor(name, city) {
    this.name = name;
    this.city = city;
    this.reviews = [];
  }

  reviewCount() {
    return 0
  }

  rating() {
    return 0
  }

  ratingAsStars() {
    if (this.rating == undefined) {
      return ''
    } else {
      return '⭐️'.repeat(this.rating)
    }
  }

  urlSlug() {
    return `${this.name.toLowerCase().replace(' ', '_')}_${this.city.toLowerCase().replace(' ', '_')}`
  }
}

module.exports = Hotel
