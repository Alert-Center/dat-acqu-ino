// '.getContext()' é um método específico para elementos 'canvas' e serve para criar uma espécie de lousa me branco para ser plotado algo, neste caso os gráficos em 2D.
var contextoDht11Umidade = document.getElementById('dht11Umidade').getContext('2d');
contextoDht11Umidade.canvas.width = 1000;
contextoDht11Umidade.canvas.height = 300;

var dht11Umidade = new Chart(
    contextoDht11Umidade,
    {
        type: 'line',
        data: {
            datasets: [{
                label: 'Umidade',
                type: 'line',
                borderColor: ['#45b3e7'],
                backgroundColor: ['#89cff0']
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    distribution: 'series',
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Umidade'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                duration: 0
            }
        }
    }
);

var contextoDht11Temperatura = document.getElementById('dht11Temperatura').getContext('2d');
contextoDht11Temperatura.canvas.width = 1000;
contextoDht11Temperatura.canvas.height = 300;

var dht11Temperatura = new Chart(
    contextoDht11Temperatura,
    {
        type: 'line',
        data: {
            datasets: [{
                label: "Temperatura",
                type: 'line',
                borderColor: ['#ff3232'],
                backgroundColor: ['#ff7f7f']
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    distribution: 'series',
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Luminosidade'
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            animation: {
                duration: 0
            }
        }
    }
);

var paginacao = {};
var tempo = {};

function obterDados(grafico, endpoint) {
    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:3300/sensores/' + endpoint, false);
    http.send(null);

    var valores = JSON.parse(http.responseText);

    if (paginacao[endpoint] == null) {
        paginacao[endpoint] = 0;
    }
    if (tempo[endpoint] == null) {
        tempo[endpoint] = 0;
    }
    
    // Exibir à partir do último elemento exibido anteriormente
    var ultimaPaginacao = paginacao[endpoint];
    paginacao[endpoint] = valores.length;

    var valores = valores.slice(ultimaPaginacao);
    valores.forEach((valor) => {
        //Máximo de 60 itens exibidos no gráfico
        if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
            grafico.data.labels.shift();
            grafico.data.datasets[0].data.shift();
        }

        grafico.data.labels.push(tempo[endpoint]++);
        grafico.data.datasets[0].data.push(parseFloat(valor));
        grafico.update();
    })
}

setInterval(() => {
    obterDados(dht11Umidade, 'dht11/umidade');
    obterDados(dht11Temperatura, 'dht11/temperatura');
}, 1000);