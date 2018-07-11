class HotelCollection {
  constructor() {
    this._hotelsList = []
  }

  get hotels() {
    return this._hotelsList
  }

  set hotels(hotel) {
    throw new Error("Cannot overwrite hotels array!")
  }

  addHotel(hotel) {
    this._hotelsList.push(hotel)
  }

  sortedHotels() {
    return this._hotelsList.sort((a,b)=> {
      return b.rating() - a.rating()
    })
  }

  find(slug) {
    let result;
    this._hotelsList.forEach(((hotel)=>{
      if (hotel.urlSlug() == slug) { result = hotel }
    }))
    return result;
  }

  delete(slug) {
    let result;
    this._hotelsList.forEach(((hotel, i) => {
      if (hotel.urlSlug() == slug) {
        result = hotel
        this._hotelsList.splice(i, 1)
      }
    }))
    return result;
  }
}

module.exports = HotelCollection
