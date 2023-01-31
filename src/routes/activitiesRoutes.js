//const axios = require('axios');
//const {v4: UUIDV4} = require('uuid')
const {Router} = require('express');
const {TouristActivity} = require('../db')
const {Country} = require('../db')

const router = Router();

router.get('/', async (req,res,next)=>{
    const response = await TouristActivity.findAll({
        attributes:{
            exclude:['createdAt','updatedAt']
        },
        include:[
            {
                model: Country,
            }
        ]
    });
    res.status(200).send(response)
});


router.post('/', async (req,res,next)=>{
    const {name,dificulty,duration,season, countries, description} = req.body;
    try{
        const newActivty = await TouristActivity.create({
            name: name,
            dificulty:dificulty,
            duration:duration,
            season:season,
            description: description
        });
        
        await newActivty.addCountry(countries)
        res.send(newActivty)
        // newActivty.length > 0 ? res.send(newActivty) :
        // 'No hay actividades en BD';
    }catch(e){
        next(e)
    }
})

router.post('/bulk', async (req,res,next)=> {
    const dataActivities = req.body;
    try{
        const activitiesBulk = await TouristActivity.bulkCreate(
            dataActivities,{
                include: [{
                model: Country,
                through: 'CountryActivity'
                }
            ]}
        );

        res.status(200).send(activitiesBulk);
    }catch(e){
        next(e);
    }
})


router.put('/:id', async (req,res,next)=>{
    const {id} = req.params
    const {name,dificulty,duration,season, countries, description} = req.body;
    try{
        const response = await TouristActivity.update( 
        {name,dificulty,duration,season, countries, description},
        {
            where:{
                id: {id}
            }
        })
        res.send(response)
    }catch(e){
        next(e)
    }
})

router.delete('/:id', async (req,res,next)=>{
    const {id} = req.params
    try{
        res.json(await TouristActivity.destroy({
            where: {id}
        }))
    }catch(e){
        next(e)
    }
})

module.exports= router;