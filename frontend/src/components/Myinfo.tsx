import { useEffect, useState } from "react"
import { api } from "./callapi"
import Studentsolve from "./Studentinfo/Studentsolve"
import Style from '../styles/Student.module.css'

const Myinfo = ()=>{

    return(
        <div className={Style.studentmain}>
        <Studentsolve/>
        </div>
    )
}

export default Myinfo