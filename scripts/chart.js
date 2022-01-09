const ctx = document.getElementById('temp-chart').getContext('2d');
console.log(graph_data);
const data = {
    labels: graph_labels,
    datasets: [{
      label: 'Průměrná teplot',
      backgroundColor: 'rgb(75, 104, 255)',
      borderColor: 'rgb(75, 104, 255)',
      data: graph_data,
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