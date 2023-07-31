export default  function (handller){
  return async (req,res,next)=>{
    try{
        await handller(req,res);
    }catch(e){
        next(e)
    }
  }
}