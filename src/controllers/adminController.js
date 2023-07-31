import express from 'express'
import 'express-async-errors';
import { allAdmin ,getAdminByEmail,  saveAdmin, getAdmin , 
    updateAdmin , deleteAdmin} from "../services/adminServices.js"

const router = express.Router();

router.get('/', async (req, res) => {
    const admins = await allAdmin();
    res.send(admins)
})

router.get('/:id', async (req, res,next) => {
    
        const {id} = req.params ; 
        const admins = await getAdmin(id);
        res.send(admins)
    
})

router.post('/' ,async(req,res)=>{
    const admins =  await saveAdmin(req.body)
    res.send(admins)

})

router.put('/:id',async(req,res,next)=>{
    try{
        const {id} = req.params;
        const admins =  await updateAdmin(id, req.body)
        res.send(admins)
    
    }catch(e){
        next(e)
    }

})


router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const admins =  await deleteAdmin(id)
    res.send(admins)

})



export default  router;
