console.log('Hallo daar!');
import axios from "axios";

// koppeling aan index
const landName = document.getElementById("list-Landen")


async function fetchData( ) {


    try {
        const response = await axios.get( 'https://restcountries.com/v2/all');
        console.log(response);




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
        console.log(response.data);



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
fetchData();


