import React, { useEffect, useState } from "react";
import Layout from '@/components/Layout'
import Maincontents from "@/components/Maincontents";
import { api } from "@/components/callapi";
import Notlogined from "@/components/Notlogined";


export default function Home() {
  const [isLogin, setLogin] = useState(false)

  useEffect(()=>{

      const senddata = {_id : localStorage.getItem('token')}

      api.fetchAuth(senddata).then((data)=>{
          if(data.Logined ===true){
            setLogin(true)
          }
          else{
          } })
  },[])

  const mainlayout =()=>{


    if(isLogin){
    return <Maincontents />
    }else{
      return <Notlogined />
    }
  }
  
    return (
      <Layout content={mainlayout()}/ >
      );
}