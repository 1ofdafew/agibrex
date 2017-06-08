new Vue({
  el: '#twitter',
  //delimiters: ['${', '}'],
  data: {
    tweets: []
  },
  created: function () {
    this.fetchTweets()
  },
  computed: {
  },
  methods: {
    update: _.debounce(function (e) {
      // this.fetchTweets()
    }, 300),
    fetchTweets: function () {
      const xhr = new XMLHttpRequest()
      const self = this
      xhr.open('GET', '/social/twitter')
      xhr.onload = function () {
        self.tweets = JSON.parse(xhr.responseText)
      }
      xhr.send()
    },
  }
})
