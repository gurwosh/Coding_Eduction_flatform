import { useState,useEffect } from "react"
import {api} from "./callapi"
import Link from 'next/link';
import Router, { useRouter } from "next/router";
import Styles from '../styles/Login.module.css';


const Loginpage = () =>{
    const router = useRouter();
    const [password,setPassword] = useState({'id':'','password': ''})

    const onChange = (e:any) => {
        password['password'] = e.target.value;
        setPassword(password)
      };


    const onIdchange =(e:any)=>{
        password['id'] = e.target.value;
        setPassword(password)
    }

    const sendData = () =>{
        api.fetchSignIn(password).then((data)=>{
            
            if(data ===null){
            
                alert('비밀번호 확인할 것')
            
            }
            
            else{
               localStorage.setItem('token', data._id);
               router.push("/")
            }
            })
    }
    return(
    
            <div className={Styles.loginmain}>
                <div className={Styles.textzone}> 교사 체험계정 <br/> ID: teacher <br/> PW: A00001 </div>
                             <div><input className = {Styles.logininput} onChange={onIdchange} placeholder='id를 입력해주세요'/></div>  
                            <div><input className={Styles.logininput} onChange={onChange} placeholder='비밀번호를 입력해주세요'/></div>
                            <div><button className={Styles.loginsend} onClick={sendData}>로그인 버튼!!</button></div>
            </div>

            

    

    )
}

export default Loginpage