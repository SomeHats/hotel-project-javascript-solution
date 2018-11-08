class Review {
  constructor(rating, text, date) {
    this.rating = parseInt(rating)
    this.text = text
    this.date = new Date(date)
  }

  ratingAsStars() {
    return '⭐️'.repeat(this.rating)
  }

  toJSON() {
    return {
      text: this.text,
      rating: this.rating,
      date: this.date,
      ratingAsStars: this.ratingAsStars(),
    }
  }
}

module.exports = Review
