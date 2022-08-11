import Link from 'next/link';
import Style from '../styles/Home.module.css'
import { useState,useEffect } from "react"
import { api } from './callapi';
import Router, { useRouter } from "next/router";


const linkStyle = {
    marginRight: 15
  };
  
const Navbar = () =>{
  
  const [isLogin, setLogin] = useState(false)
  const [usertype,setUsertype] = useState('S')
  const router = useRouter();

  useEffect(()=>{

    const senddata = {_id : localStorage.getItem('token')}

    api.fetchAuth(senddata).then((data)=>{
      if(data.Logined ===true){
        setLogin(true)
        setUsertype(data.data.type)
      }
      else{
      } })
  })
  

  const logout =() =>{
     localStorage.removeItem('token');
     router.push('/login')
     setLogin(false)
     setUsertype('S')

  }


  const loginbtn =() =>{
    if(isLogin){
      return <a onClick={logout} style={linkStyle}>로그아웃</a>
    }

    else{
      return( 
      <Link href="/login">
      <a style={linkStyle}>로그인</a>
      </Link>
      )
      }
  }
  

  const myinfo = ()=>{
    
    if(usertype =='T'){
      return(
        <Link href="/studentinfo">
        <a style={linkStyle}>학생관리</a>
        </Link>
      )
    }

    else{
      return(
        <Link href="/myinfo">
        <a style={linkStyle}>풀이조회</a>
        </Link>
      )
    }

  }
  
  
  return (
    <div className={Style.footer}>
    <Link href="/">
      <a style={linkStyle}>활동</a>
    </Link>

    <Link href="/rigist">
      <a style={linkStyle}>문제등록</a>
    </Link>
    {myinfo()}
    {loginbtn()}
    
  </div>
)}


    /*
    <Link href="/bank">
      <a style={linkStyle}>은행</a>
    </Link>
    */

    
export default Navbar