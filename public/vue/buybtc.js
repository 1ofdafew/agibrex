
jQuery(document).ready(function() {
  var data = {
    type: '{{ type }}',
    defaultBuyCurrency: '{{ defaultBuyCurrency }}',
    curBalance1: '{{ curBalance1 }}',
    btcSpotPrice: '{{ btcSpotPrice }}'
  }
  var buybtc = new Vue({
    el: '#vuebuybtc',
    data: data,
    methods: {
    },
    computed: {
    }
  })

})

