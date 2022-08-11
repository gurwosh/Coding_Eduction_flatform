import { api } from '@/components/callapi'
import Myinfo from '@/components/Myinfo'
import Notlogined from '@/components/Notlogined'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'



function Info (){

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

  const myinfolayout =()=>{


    if(isLogin){
    return <Myinfo />
    }else{
      return <Notlogined />
    }
  }

    return (
      <Layout content={myinfolayout()}/ >
      );
    
}


export default Info