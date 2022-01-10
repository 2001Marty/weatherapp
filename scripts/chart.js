const ctx = document.getElementById('temp-chart').getContext('2d');

const data = {
    labels: graph_labels,
    datasets: [{
      label: 'Denní teplot',
      backgroundColor: 'rgb(75, 104, 255)',
      borderColor: 'rgb(75, 104, 255)',
      data: graph_data,
    },
    {
        label: 'Večerní teplota',
        backgroundColor: 'rgba(150, 150, 150, 1)',
        borderColor: 'rgba(150, 150, 150, 1)',
        data: graph_data_night,
      }]
  };

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                ticks: {
                    color: 'blue',
                    }
                },   
            y: {
                ticks: {
                    color: 'blue',
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return value + ' °C' ;
                    }
                }
            }
        }
    }
  };

const tempChart = new Chart(ctx, config);