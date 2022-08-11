import Layout from '../components/Layout'
import Studentinfo from '@/components/Studentinfo/Studentinfo';
import { useEffect, useState } from 'react';
import Notlogined from '@/components/Notlogined';
import { api } from '@/components/callapi';
const aboutPageContent = <p>학생정보페이지 입니다.</p>


function Studentinfopage (){


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

  const studentlayout =()=>{


    if(isLogin){
    return <Studentinfo />
    }else{
      return <Notlogined />
    }
  }
  
    return (
      <Layout content={studentlayout()}/ >
      );
    
}


export default Studentinfopage

