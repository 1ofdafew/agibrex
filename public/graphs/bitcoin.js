// $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=new-intraday.json&callback=?', function (data) {
$.ajax({
  url: '/data/bitcoin',
  dataType: 'jsonp'
});

function callback(data) {
  // console.log('data: ', data)

  var series = {
    data: []
  };
  $.each(data, function(lineNo, line) {
    // console.log('>>', lineNo, 'line:', line);
    var ts = moment(line[0], 'YYYY-MM-DD 00,00,00').unix();
    // console.log('ts: ', ts)
    series.data.push([ts, line[1]])
  });

  console.log(series.data)

  // Create the chart
  Highcharts.stockChart('container', {

    rangeSelector: {
      buttons: [{
        type: 'hour',
        count: 1,
        text: '1h'
      }, {
        type: 'all',
        count: 1,
        text: 'All'
      }],
      selected: 1,
      inputEnabled: false
    },

    title: {
      text: 'Bitcoin Price'
    },    

    xAxis: {
      gapGridLineWidth: 0
    },
    
    series: [{
      name: 'Bitcoin',
      data: series.data,
      tooltip: {
        valueDecimals: 2
      }
    }]
  });  
};
