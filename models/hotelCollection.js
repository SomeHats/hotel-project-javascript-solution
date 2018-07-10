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
    this.hotelsList.push(hotel)
  }

  sortedHotels() {
    return this.hotelsList.sort((a,b)=> {
      return b.rating() - a.rating()
    })
  }

  find(slug) {
    let result;
    this.hotelsList.forEach(((hotel)=>{
      if (hotel.urlSlug() == slug) { result = hotel }
    }))
    return result;
  }

  delete(slug) {
    let result;
    this.hotelsList.forEach(((hotel, i) => {
      if (hotel.urlSlug() == slug) {
        result = hotel
        this.hotelsList.splice(i, 1)
      }
    }))
    return result;
  }
}

module.exports = HotelCollection
