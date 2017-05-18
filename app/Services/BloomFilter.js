'use struct'

const MarketData = use('App/Model/MarketData')

class BloomFilter {
  constructor(data) {
    this.data = data
    console.log(data)
  }

  * sift(regexp) {
    var RE = new RegeExp(regexp)
    if (RE.exec(this.data)) {
      // ok, the data matched our regular expression search

      // now, go through each record, and make a data out of them.
      console.log(this.data)

      // const md = new MarketData(this.data)
      // yield md.save()
      // console.log(md)
    } else {
      return this.data
    }
  }

}

module.exports = BloomFilter
