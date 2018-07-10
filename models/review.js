class Review {
  constructor(rating, text, date) {
    this.rating = parseInt(rating)
    this.text = text
    this.date = new Date(date)
  }

  ratingAsStars() {
    return '⭐️'.repeat(this.rating)
  }
}

module.exports = Review
