
# *MeteoStats*

[Odkaz na web](https://jovial-jennings-d49889.netlify.app)

**Popis**

Jednoduchá webová aplikace pro předpověd počasí následujících 5 dní.





[![Size](https://img.shields.io/github/repo-size/2001Marty/weatherapp?color=red&label=velikost%20projektu)](https://github/directory-file-count/:user/:repo)

![css](https://img.shields.io/badge/-CSS3-blue)

![html](https://img.shields.io/badge/-HTML5-blue) 

![javascript](https://img.shields.io/badge/-JavaScript-blue)


## Funkce

- **5 karet pro předpověď počasí na následujících dní**
    - denní, noční a pocitová teplota
    - obrázek s popiskem přepovědi
    - vlhkost, rychlost větru

- **Graf teploty**
    - větev pro denní a noční teplotu
    - graf je vytvořen pomocí javascriptové knihovny [*Chart.js*](https://www.chartjs.org)

- **Textové pole pro výběr města**
    - našptáváč který úkáže nejbližší výsledky k vyhledávanému pojmu

- **Geolokace**
    - pokud je poloha přístupná web zobrazí data k aktualní poloze


## API 

Pro získání aktualních dat o počasí bylo použito [*OpeanWeather API*](https://openweathermap.org/api)



## Struktura projektu
```
root
│   README.md
│   index.html  
│
└─── data
│       city.list.json
│   
└─── images
│       weather-app.png
│       
└─── scripts
│       chart.js 
│       loaction.js
│       weather.js
│
└─── styles
        index.css
```
