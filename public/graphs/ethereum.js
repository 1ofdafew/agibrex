// $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=new-intraday.json&callback=?', function (data) {
$.ajax({
  url: '/data/ethereum',
  dataType: 'jsonp'
});

function callback(data) {
  // console.log('data: ', data)

  var series = {
    data: []
  };
  $.each(data, function(lineNo, line) {
    // console.log('>>', lineNo, 'line:', line);
    var ts = moment(line[0], 'YYYY-MM-DD').unix();
    series.data.push([ts, line[1]])
  });

  // console.log(series.data)

  // Create the chart
  Highcharts.stockChart('container', {

    rangeSelector: {
      buttons: [{
        type: 'hour',
        count: 1,
        text: '1h'
      }, {
        type: 'month',
        count: 1,
        text: '1m'
      }, {
        type: 'year',
        count: 1,
        text: '1y'
      }, {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 4,
      inputEnabled: false
    },

    title: {
      text: 'Ethereum Price'
    },    

    xAxis: {
      gapGridLineWidth: 0
    },

    series: [{
      name: 'Ethereum',
      data: series.data,
      tooltip: {
        valueDecimals: 2
      }
    }]
  });  
};
