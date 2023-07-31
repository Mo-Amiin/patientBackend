import express from 'express'
import { allResponsible ,SearchByNumber,  saveResponsible, 
    updateResponsible , deleteResponsibles, getResponsible} from "../services/responsibleService.js"
import {authorize}  from '../middleware/auth.js';
import { Role } from '../security/securityConfig.js';

const router = express.Router();


router.get('/',async (req, res) => {
    const responsibles = await allResponsible();
    res.send(responsibles)
})


router.get('/:id', async (req, res) => {
    const {id} = req.params ;
    const responsibles = await getResponsible(id);
    res.send(responsibles)
})

router.post('/signUp/' ,async(req,res)=>{
    const responsibles=  await saveResponsible(req.body)
    res.send(responsibles) ;
})

router.put('/:id',async(req,res)=>{
    const {id} = req.params ;

    const responsibles =  await updateResponsible(id , req.body)
    res.send(responsibles) ;

})

router.delete('/:id',async(req,res)=>{
     const {id} = req.params;
     const responsibles = await deleteResponsibles(id)
     res.send(responsibles) ;

})

export default  router;
