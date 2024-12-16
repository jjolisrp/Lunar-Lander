function ChangePage(page)
{
    window.location.href = page;
}

function WindowClose()
{
    window.close();
}

const musicSlider = document.getElementById('music-slider');
const musicValue = document.getElementById('music-value');

//Función de flecha
musicSlider.addEventListener('input', () =>
{
    musicValue.textContent = `${musicSlider.value}%`;
    
    musicSlider.style.background = `linear-gradient(to right, #00cf68 ${musicSlider.value}%,rgb(134, 134, 134) ${musicSlider.value}%)`;

    localStorage.setItem('MusicVolume', musicSlider.value);
});

const sfxSlider = document.getElementById('sfx-slider');
const sfxValue = document.getElementById('sfx-value');

sfxSlider.addEventListener('input', () =>
{
    sfxValue.textContent = `${sfxSlider.value}%`

    sfxSlider.style.background = `linear-gradient(to right, #00cf68 ${sfxSlider.value}%,rgb(134, 134, 134) ${sfxSlider.value}%)`;

    localStorage.setItem('SFXVolume', sfxSlider.value);
});

document.addEventListener('DOMContentLoaded', () =>
    {
        const savedMusicValue = localStorage.getItem('MusicVolume');
        const savedSFXValue = localStorage.getItem('SFXVolume');
    
        if(savedMusicValue != null)
        {
            
        }
    });