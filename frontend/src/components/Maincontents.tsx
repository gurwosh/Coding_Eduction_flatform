import { render } from "react-dom"
import { useState, useEffect } from "react"
import Style from '../styles/Maincontents.module.css'
import AiContentbox from "./AiContentbox"
import { api } from './callapi';
import Router, { useRouter } from "next/router";
import { Url } from "url";


const Maincontents = () => {

    const[tabledata,setTable] = useState([])
    const router = useRouter();

    useEffect(()=>{
        api.fetchLoadTableData().then((data)=>{
            setTable(data)
        })
    },[])




    const boxclick=(e:any)=>{
        const pid = e.currentTarget.id.toString()
        router.push( `solvepages/${pid}` )
    }



    const rendering=()=>{
        const result = []
        for(let i =0; i<tabledata.length; i++){
            let boxid = 'box'+i.toString()         //tabledata[i]['_id']
            result.push(<div key={i} onClick={boxclick}  id={boxid} className={Style.contentsbox}><AiContentbox boxdata ={tabledata[i]} /></div>)
        }
        return result
    }


    return(
        <>

            <div  className={Style.container}>
                {rendering()}
            </div>
        </> 
    )
    
} 


export default Maincontents