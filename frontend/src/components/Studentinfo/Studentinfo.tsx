import { useEffect, useState } from "react"
import Studentrigist from "./Studentrigist"
import Studentsolve from "./Studentsolve"
import Style from '../../styles/Student.module.css'

const Studentinfo = () =>{

    const [rigistyle,setRigi] = useState({display:'block'})
    const [searchstyle,setSearch] = useState({display:'none'})
    const [userdata,setUser] =useState({})
    
    const gorigi = (e:any)=>{
        setRigi({display:'block'})
        setSearch({display:'none'})
    }

    const gosearch = (e:any) =>{
        setRigi({display:'none'})
        setSearch({display:'block'})
    }

    useEffect(()=>{

    },[])
    




    return(
        <div className={Style.studentmain}>          
                    <div className={Style.titlezone}><button className={Style.btn}  onClick={gorigi}>학생등록</button><button className={Style.btn}  onClick={gosearch}>학급 활동 조회</button></div>
                    <div className={Style.main2} style={rigistyle}> <Studentrigist /></div>
                    <div className={Style.main2}style={searchstyle}><Studentsolve /></div>
        </div>

    )  
    }
      
      
export default Studentinfo 