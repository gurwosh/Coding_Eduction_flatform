import Styles from '../styles/Rigist.module.css';
import { useState } from 'react';
import {api} from "./callapi"
import Router, { useRouter } from "next/router";


const RigistCn = () =>{

  const[count,setCount] =useState(25)
  const router = useRouter();
  let data: any = {'type':'cnn','title':'','group':'','stName':'','secondName':'','1st':'','2nd':''}
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


  const makeoption=()=>{
    let result=[<option key={-1}>분류를 선택해 주세요</option>]
    for(let i=1;i<3;i++){
        let optionvalue = 'sel'+i.toString()
        result.push(<option key={i} value={optionvalue}>{'분류'+i.toString()}</option>)
    }
    return result
  }


  const setvalue=(e:any)=>{
    tabledata[e.currentTarget.id] = e.currentTarget.value;
    console.log(tabledata)
  }

  const maketable=(num:any,count:Number)=>{
      const result =[]
      for(let i=num; i<count ; i++){
          let inputstid = 'T'+ i.toString();
          let inputsecondid = 'S' +i.toString();
          let inputthirdid = 'E'+i.toString()
          tabledata[inputstid] = 0
          tabledata[inputsecondid] =0
          tabledata[inputthirdid] =0

          result.push(<div key={i}><input className={Styles.input}  type='Number' id= {inputstid} onChange={tablechange} placeholder='숫자적기'/><input className={Styles.input} type='Number' id ={inputsecondid} onChange={tablechange} placeholder='숫자적기'/><select className={Styles.input}  id={inputthirdid} onChange={setvalue}>{makeoption()}</select></div>)
      }
      return result
  }
  const set1st =(e:any)=>{
    data['1st'] = e.target.value;
  }

  const set2nd=(e:any)=>{
    data['2nd']= e.target.value
  }


  return(
      <div className={Styles.rigistmain}>
          <div className={Styles.headzone}>
              <div>제목: <input className={Styles.headinput} onChange={titleChange} />  모둠이름: <input className={Styles.headinput} onChange={groupChange}  /></div>
              <div>분류1<input className={Styles.headinput} onChange={set1st}></input>분류2<input className={Styles.headinput} onChange={set2nd}></input></div>
              <div className={Styles.tablebtnzone}><button className={Styles.tablebtn} onClick={plustable}>표늘리기</button> <button className={Styles.tablebtn} onClick={minustable}>표줄이기</button> 
              현재 표의 줄 수 = {count}</div>
              
          </div>


          <div className={Styles.rigisttable}>
              <input className={Styles.input} onChange={stnameChange} placeholder='값1'/><input className={Styles.input}  onChange={secondnameChange} placeholder='값2'/>
              {maketable(0,count)}
          </div>

          <div className={Styles.btnzone}>
              <button className={Styles.rigistbtn} onClick={senddata}> 등록하기 </button>
          </div>

      </div>
  )  
}
  
  
  export default RigistCn