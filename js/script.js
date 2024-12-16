const musicSlider = document.getElementById('music-slider');
const musicValue = document.getElementById('music-value');

function ChangePage(page)
{
    window.location.href = page;
}

function WindowClose()
{
    window.close();
}

//Función de flecha
musicSlider.addEventListener('input', () =>
{
    musicValue.textContent = `${musicSlider.value}%`;
    
    musicSlider.style.background = `linear-gradient(to right, #00cf68 ${value}%, #00460c ${value}%)`;
});