import Layout from '../components/Layout'
import Link from 'next/link';
import Styles from '../styles/Rigist.module.css';
import { useEffect, useState } from 'react';
import { api } from '@/components/callapi';
import Notlogined from '@/components/Notlogined';

function Rigist (){

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

  const rigistlayout =()=>{


    if(isLogin){
    return(
        <div className={Styles.rigistlayout}>
          <Link  href="/rigistcnn">
              <a>분류해보기</a>
          </Link>
          <Link href="/rigistliner">
               <a>선그려 예측해보기</a>
          </Link>
         </div>  
  
    )
    }else{
      return <Notlogined />
    }
  }





    return (
      <Layout content={rigistlayout()}/ >
      );
    
}



export default Rigist