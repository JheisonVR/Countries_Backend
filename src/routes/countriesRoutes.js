const axios = require ('axios');
const {Op} = require('sequelize')
const {Router} = require('express');
const {Country, TouristActivity} = require('../db');

const router = Router();


router.get('/', async (req,res,next)=> {
    const {name} = req.query;
    try{
        if(!name){
            const response = await Country.findAll();
            res.send(response);
        }else{
            const response = await Country.findOne({
                where:{
                    name:{
                        [Op.like]:`${name}%`
                    },                    
                    attributes:{
                        exclude:['createdAt','updatedAt']
                    }
                }
            })
            res.status(200).send(response)
        }
    }catch(e){
        next(e)
    }
})
    
router.get('/allApi', async(req,res,next)=>{
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/all`)
            res.status(200).send(response.data)
    }catch(e){
        next(e)
    }
})


router.get('/allApi/:id', async (req, res, next)=>{
    let {id} = req.params;
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)        
        res.status(200).send(response.data)
    }catch(e){
        next(e)
    }
})


// router.get('/:id', async (req, res, next)=>{
//     let {id} = req.params;
//     try{
//         await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
//             .then(data =>                 
//                 ({
//                     name: data.data[0].name.common,
//                     id:data.data[0].cca3,
//                     capital: data.data[0].capital,
//                     region:data.data[0].region,
//                     subregion:data.data[0].subregion,
//                     flags: data.data[0].flags.png,
//                     area: data.data[0].area,
//                     population: data.data[0].population,                        
//                 }))
//                 .then(data => res.send(data))
//     }catch(e){
//         next(e)
//     }
// })


router.get('/:id', async (req,res,next)=>{
    const {id} = req.params;
    try{
        const response = await Country.findOne({
            where:{
                id: id            
            },
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            include:[
                {
                    model: TouristActivity,                    
                }
            ]
        })
        res.status(200).send(response)
    }catch(e){
        next(e)
    }
})





router.post('/bulk', async (req,res,next)=>{
    const dataCountries = req.body;
    try{
        const countriesArray = await Country.bulkCreate(dataCountries);
        res.status(200).send(countriesArray)
    }catch(e){
        next(e)
    }
})






/*
Imagen de la bandera
Nombre
Continente

    const {name,capital,continents,flags } = response.data;
    const information = {
        name:name,
        capital:capital,
        continent:continents,
        flag:flags
    }
    res.send(information);


    {
    "name": "name",
    "flag":"flag",
    "continent":"continent",
    "capital":"capital",
    "subregion":"subregion",
    "area":"area",
    "poblacion":"poblacion"
    }

*/


module.exports= router;