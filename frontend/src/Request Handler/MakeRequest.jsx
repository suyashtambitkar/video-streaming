import Cookies from "js-cookie";

// Make Unauthenticated Request (POST).
export const makeUnAuthRequest = async (route, body) => {
   const res = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
   });
   const data = await res.json();
   const token = data.token;
   Cookies.set("token", token); 
   return data;
}


// Make Authenticated Request (POST).
export const makeAuthPostRequest = async (route, body) => {
   const Token = Cookies.get("token");
   const res = await fetch(route, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${Token}`
      },
      body: JSON.stringify(body)
   });
   const resData = await res.json();
   return resData;
}

// Make Authenticated Request (GET).
export const makeAuthGetRequest = async (route) => {
   const Token = Cookies.get("token");
   const res = await fetch(route, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${Token}`
      },
   });
   const resData = await res.json();
   return resData;
}

// Make Authenticated Request (DEL).
export const makeAuthDelRequest = async (route, body = null) => {
   const Token = Cookies.get("token");
   const options = {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${Token}`
      },
   }
   
   if(body){
      options.body = JSON.stringify(body);
   }
   
   const res = await fetch(route,options);
   const resData = await res.json();
   return resData;
}

// Make Authenticated Request (POST) Without data.
export const makeAuthPostRequestWithoutData = async (route)=>{
   const Token = Cookies.get("token");
   const res = await fetch(route,{
      method:"POST",
      headers:{
         "Content-Type":"application/json",
         "Authorization":`Bearer ${Token}`
      },
   });
   const resData = await res.json();
   return resData;
}