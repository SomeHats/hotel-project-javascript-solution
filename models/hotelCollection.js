class HotelCollection {
  constructor() {
    this.hotelsList = []
  }

  get hotels() {
    return this.hotelsList
  }

  set hotels(hotel) {
    throw new Error("Cannot overwrite hotels array!")
  }

  addHotel(hotel) {
    this.hotels.push(hotel)
  }

  sortedHotels() {
    return this.hotels.sort((a,b)=> {
      return b.rating() - a.rating()
    })
  }
}

module.exports = HotelCollection
