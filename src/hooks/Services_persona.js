
import {POST} from "./connection";

import {GET} from "./connection";

export async function all_personas(token) {
    let datos =null;
     try {
        
        datos = await GET('persona',token);
     } catch (error) {   
        console.log(error.response.data);  
        return {"code":500}
     }
        return datos.data;
}


export async function save(data,token) {
   let datos =null;
    try {
       
       datos = await POST('persona/guardar/censada',data,token);
    } catch (error) {   
       console.log(error.response.data);  
       return {"code":3000}
    }
       return datos.data;
}
