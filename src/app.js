console.log('Hallo daar!');
import axios from "axios";




//------------------------------------------------------------------------OPDRACHT 1--------------------------------//
// koppeling aan index
const landName = document.getElementById("list-Landen")


async function banaan( ) {

    try {
        const response = await axios.get( 'https://restcountries.com/v2/all');
        // console.log(response);

        landName.replaceChildren();

        response.data.sort ((a,b) => (a.population - b.population));

        //door de data heen mappen
        response.data.map((country) => {

            //sorteren

            //create new elements with attributes
            const countryName = document.createElement('li');
            countryName.setAttribute('class', 'country-name')
            countryName.textContent = country.name;

            const population = document.createElement('li');
            population.setAttribute('class', 'population')
            population.textContent = `Has a population of ${country.population} people`;



            const region = document.createElement('li');
            region.setAttribute('class', 'region')
            region.textContent = `and lies in the region ${country.region} `;


            const flags = document.createElement('img');
            flags.setAttribute("src", country.flags.png);
            flags.setAttribute("class", "flag");

            //Voegt data toe aan de lijst
            landName.appendChild(countryName);
            landName.appendChild(population);
            landName.appendChild(region);
            landName.appendChild(flags);

            switch (country.region) {
                case  'Africa': countryName.style.color = 'blue'
                    break;
                case 'Asie': countryName.style.color = 'red'
                    break;
                case 'Oceania' : countryName.style.color = 'purple'
                    break;
                case 'Europe' : countryName.style.color = 'yellow'
                    break;
                default: countryName.style.color = 'green'

            }

        })
        // console.log(response.data);
    } catch (error) {

        // Verwijzing naar error message
        const errorMessage = document.getElementById('error-message');

        // Check welke error message van toepassing is
        if (error.response.status === 404) {
            errorMessage.textContent = "Page Not Found | 404"
        }
        if (error.response.status === 500) {
            errorMessage.textContent = "Internal Server Error | 500"
        }
    }

}
banaan();

//-----------------------------------------EINDE OPDRACHT 1---------------------------------------//


//------------------------------------- OPDRACHT 2-----------------------------------------------//


const countryP2 = document.getElementById("country-part2")
let errorMessage = "";

async function fetchSpecData(country){

    try {
        const response = await axios.get(`https://restcountries.com/v2/name/${country}`,{
            params : {
                userInput : country
            }
        });

        countryP2.replaceChildren();
        errorMessage.replaceChildren();



        response.data.map((country) => {

            const {flags:{png}, name, capital, subregion, population, currencies,languages
            } = country;

            let coinString
            currencies.map((coin) => {
                if (currencies.length < 2) {
                    coinString = `and you can pay with ${coin.name}`
                } else {
                    for (let i = 0; i < currencies.length; i++) {
                        coinString = `and you can pay with ${coin.name[0]} and ${coin.name[1]}`
                    }}})
            let soundOfTalks
            const soundOfTalksArray = languages.map((sound)=> {
                return sound.name;
            })
                    if (languages.length < 2){
                        soundOfTalks = `They speak ${soundOfTalksArray[0]}`
                    }else if ( languages.length === 2) {
                        soundOfTalks = `They speak ${soundOfTalksArray[0]} and ${soundOfTalksArray[1]} `
                    }else {
                       soundOfTalks = `They speak ${soundOfTalksArray[0]} , ${soundOfTalksArray[1]} and ${soundOfTalksArray[2]} `
                    }

                    //create new elements with attributes
            const countryName = document.createElement('p');
            countryName.setAttribute('class', 'country-name')
            countryName.textContent =`${name} is situated in ${subregion}. It has a population of ${population} people.`;

            const valuta = document.createElement('p');
            valuta.setAttribute('class', 'currencies')
            valuta.textContent = currencies;

            const typeOfSound = document.createElement('p');
            typeOfSound.setAttribute('class', 'language')
            typeOfSound.textContent = soundOfTalks ;

            const populations = document.createElement('p');
            populations.setAttribute('class', 'population')
            populations.textContent =  population;

            const subregions = document.createElement('p');
            subregions.setAttribute('class', 'subregion')
            subregions.textContent = subregion;


            const flags = document.createElement('img');
            flags.setAttribute("src", png);
            flags.setAttribute("class", "flag");

            const capitals = document.createElement('p');
            capitals.setAttribute('class', 'capital')
            capitals.textContent =`The capital is ${capital} ${coinString}`  ;

            countryP2.appendChild(flags);
            countryP2.appendChild(countryName);
            countryP2.appendChild(capitals);
            countryP2.appendChild(typeOfSound);

        })
    }
    catch (error) {

        countryP2.replaceChildren();


            // Verwijzing naar error message
            errorMessage = document.getElementById('error-message');

            // Check welke error message van toepassing is
            if (error.response.status === 404) {
                errorMessage.textContent = "Page Not Found | 404"
            }
            if (error.response.status === 500) {
                errorMessage.textContent = "Internal Server Error | 500"
            }
    }
}

let value = ""
function textValue(input){
    value = input.target.value;
}
const userInput = document.getElementById('countryInfo');
userInput.addEventListener("keyup", textValue)

const button = document.getElementById( 'button' );
 button.addEventListener( 'click' , () => {
     fetchSpecData(value)
     userInput.value = "";
 })
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("button").click();
        userInput.value = "";
    }
});
































