import { apiRequestException } from '../exceptions/apiException.js'
import { adminSchema} from "../utility/validation-schema.js"
import {validateUtil} from '../utility/utlity.js'
import {findmany , save , findByEmail ,
     update , deleteById, findId, isExist } from "../repository/adminRepo.js"
import { encodePassword } from '../security/securityConfig.js'

export const saveAdmin = async(admin={})=>{
    admin.password = await encodePassword(admin.password)
    await validateUtil(admin , adminSchema)
    const isAdminExist = await isExist(admin.name , admin.email)
    if(isAdminExist) return  apiRequestException(`Error: this admin is already registered`, 403)
    return await save(admin);
}

export const getAdmin = async(id)=>{
  return (
    (await findId(id)) || 
     apiRequestException(`Error: admin of this id ${id} is not found`, 404)
  );
}

export const allAdmin = async()=>{
   return await findmany();
}
export const getAdminByEmail = async(number)=>{
    return await findByEmail(number)
}

export const updateAdmin = async(id , admin = {})=>{
    const adminId = await getAdmin(id);
    if(!adminId) return   apiRequestException(`Error: admin of this id ${id} is not found`, 404)
    await validateUtil(admin , adminSchema)
    return await update(id , admin)

};

export const deleteAdmin =async (id)=>{
    const adminId = await getAdmin(id);
    if(!adminId) return   apiRequestException(`Error: admin of this id ${id} is not found`, 404)
    return await deleteById(id) 
}

export const addDefaultAdminAccount = async() => {
    const admin = {
      name: "Admin",
      email: "example@domain.com",
      password: "abcd1234",
    };
    const isAdminExist = await isExist(admin.email,admin.password)
    if(isAdminExist) return 
    await saveAdmin(admin);
  };