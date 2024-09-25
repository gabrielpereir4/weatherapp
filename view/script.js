document.addEventListener('DOMContentLoaded', function() {   
    document.getElementById('weather-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const location = document.getElementById('location').value;
        const weatherResult = document.getElementById('weather-result');
        const cityName = document.getElementById('city-name');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');

        try {
            // Faz a requisição ao backend, enviando a cidade como query string
            // console.log('Testando...')
            const response = await fetch(`http://localhost:5500/api/weather?location=${location}`);
            const data = await response.json();

            if (response.ok) {
                // Atualiza a página com as informações de clima recebidas
                cityName.textContent = `Clima em ${data.name}, ${data.sys.country}`;
                temperature.textContent = `Temperatura: ${data.main.temp}°C`;
                description.textContent = `Descrição: ${data.weather[0].description}`;
                weatherResult.style.display = 'flex';  // Exibe os resultados
            } else {
                // Exibe mensagem de erro se a localização não for encontrada
                cityName.textContent = `Erro: Localização não encontrada.`;
                temperature.textContent = '';
                description.textContent = '';
                weatherResult.style.display = 'flex';
            }
        } catch (error) {
            // Lida com erros na requisição (por exemplo, problemas de rede)
            cityName.textContent = `Erro: Não foi possível buscar o clima.`;
            temperature.textContent = '';
            description.textContent = '';
            weatherResult.style.display = 'flex';
        }
    });
});