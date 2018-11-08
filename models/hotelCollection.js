class HotelCollection {
  constructor() {
    this.hotels = []
  }

  addHotel(hotel) {
    this.hotels.push(hotel)
  }

  sortedHotels() {
    return this.hotels.sort((a, b) => {
      return b.rating() - a.rating()
    })
  }

  find(slugToFind) {
    for (var hotel of this.hotels) {
      if (hotel.urlSlug() === slugToFind) {
        return hotel
      }
    }

    return null
  }

  delete(slugToDelete) {
    var hotelToDelete = this.find(slugToDelete)
    var indexOfHotel = this.hotels.indexOf(hotelToDelete)

    // delete the hotel:
    this.hotels.splice(indexOfHotel, 1)

    return hotelToDelete
  }
}

module.exports = HotelCollection
