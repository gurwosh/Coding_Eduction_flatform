import Styles from '../styles/Rigist.module.css';
import { useState } from 'react';
import {api} from "./callapi"
import Router, { useRouter } from "next/router";


const RigistLine = () =>{

    const[count,setCount] =useState(25)
    const router = useRouter();
    let data: any = {'type':'liner','title':'','group':'','stName':'','secondName':''}
    let tabledata: any = {}
    

    const titleChange = (e: any) =>{
        data['title'] = e.target.value;
    }

    const groupChange = (e: any) =>{
        data['group'] = e.target.value;
    }
    const stnameChange = (e: any) =>{
        data['stName'] = e.target.value;
    }

    const secondnameChange = (e: any) =>{
        data['secondName'] = e.target.value;
    }


    const tablechange =( e: any) => {
        tabledata[e.target.id] = e.target.value;
    }



    const plustable = () =>{
        let newcount = count+1
        setCount(newcount)
    }

    const minustable = () => {
        if(count ==25 ){
            alert('최소 25이상은 되어야 합니다')
        }
        else{
            let newcount= count-1
            setCount(newcount)
        }
    }

    const senddata =() =>{
        let sendData = {'headdata':[data],'tabledata':[tabledata]}
        api.fetchAddTableData(sendData).then( data =>{ 
            console.log(data)
            alert('문제등록완료'); 
            router.push("/")})
    }



    const maketable=(num:any,count:Number)=>{
        const result =[]
        for(let i=num; i<count ; i++){
            let inputstid = 'T'+ i.toString();
            let inputsecondid = 'S' +i.toString();
            tabledata[inputstid] = 0
            tabledata[inputsecondid] =0
            result.push(<div key={i}><input className={Styles.input}  type='Number' id= {inputstid} onChange={tablechange} placeholder='숫자적기'/><input className={Styles.input}  type='Number' id ={inputsecondid} onChange={tablechange} placeholder='숫자적기'/></div>)
        }
        return result
    }



    return(
        <div className={Styles.rigistmain}>
            <div className={Styles.headzone}>
                제목: <input className={Styles.headinput} onChange={titleChange} />  모둠이름: <input className={Styles.headinput} onChange={groupChange}  />
               <div className={Styles.tablebtnzone}> <button className={Styles.tablebtn} onClick={plustable}>표늘리기</button> <button className={Styles.tablebtn} onClick={minustable}>표줄이기</button> 
                현재 표의 줄 수 = {count} </div>
            </div>

            <div className={Styles.rigisttable}>
                <input className={Styles.input} onChange={stnameChange} placeholder='값1'/><input className={Styles.input} onChange={secondnameChange} placeholder='값2'/>
                {maketable(0,count)}
            </div>

            <div className={Styles.btnzone}>
                <button className={Styles.rigistbtn} onClick={senddata}> 등록하기 </button>
            </div>

        </div>
    )  

}


export default RigistLine