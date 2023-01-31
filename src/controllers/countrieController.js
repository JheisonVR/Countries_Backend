const axios = require("axios");
const {Country} = require('../db')


async function getCountries(){
    try{
        let countriesInfo = [];
        await axios.get(`https://restcountries.com/v3.1/all`)
            .then(data => {
                for(let i=0; i<data.data.length; i++){
                    let info = {
                        id:data.data[i].cca3,
                        name: data.data[i].name.common,
                        flags: data.data[i].flags.png,
                        region:data.data[i].region,
                        capital: data.data[i].capital,
                        population: data.data[i].population,
                        subregion: data.data[i].subregion,
                        area: data.data[i].area,
                        maps: data.data[i].maps.googleMaps,
                        coatOfArms: data.data[i].coatOfArms.svg

                    };
                    countriesInfo.push(info)
                }
            })
        await Country.bulkCreate(countriesInfo)
        console.log("🚩 Countries in BD ")
    }catch(e){
        console.log(e)
    }
}

module.exports = getCountries;