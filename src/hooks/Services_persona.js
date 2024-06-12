
import {POST} from "./connection";

import {GET} from "./connection";

export async function all_personas(token) {
    let datos =null;
     try {
        
        datos = await GET('persona',token);
     } catch (error) {   
        //console.log(error.response.data);  
        return {"code":500}
     }
        return datos.data;
}

export async function get_person(token, external) {
   let datos = null;
   try {
     datos = await GET('/persona/'+external, token);
   } catch (error) {
     console.error(error.response?.data || error.message);  
     return {"code": 500};
   }
   return datos.data;
 }



 export async function modify_censado(data, token){
   let datos = null;
   try{
       datos = await POST('/persona/modificar/censada', data, token);
   }
   catch(error){
       return error.data;
   }
   return datos.data
}

export async function search(token, data) {
   let datos = null;
   try {
     const url = `/persona/buscar/${data.nombres}/${data.apellidos}/${data.fecha_nac}`;
     //console.log(url);
     datos = await GET(url, token);
     //console.log("ggggg")
     //console.log(datos);
   } catch (error) {
     console.error(error.message);
     return { code: 500, message: error.message };
   }
   return datos.data;
 }
 


export async function save(data,token) {
   let datos =null;
    try {
       
       datos = await POST('persona/guardar/censada',data,token);
    } catch (error) {   
       console.log(error.response.data);  
       return error.response.data
    }
       return datos.data;
}


export async function all_civil() {
   let datos = null;
   try {
       datos = await GET('/estado_civil');
   } catch (error) {
       return error.response.data;
   }
   return datos.data; // Return the estado civil data from the response
}
//MODIFICAR Y HACER EN EL PAGE DE EXTERNAL[] LLAMANDO A ESA HVD, ERRORES EN BACK, GET_PERSONA ARREGLAR







export async function censar(data,token) {
   let datos =null;
    try {
       
       datos = await POST('/persona/censar',data,token);
    } catch (error) {   
       console.log(error.response.data);  
       return error.response.data
    }
       return datos.data;
}