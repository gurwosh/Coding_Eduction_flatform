import { useEffect, useState } from "react"
import { api } from "./callapi"
import Styles from '../styles/Liner.module.css';
import router from "next/router";

const Cnnsolve =  (props:{solvedata:any}) =>{

    const[answer,setAnswer]:any = useState({'0': 0,'1':0, '2':0,'3':0,'4':0, '5':0,'6':0})
    const[finalpoint,setPoint] = useState({'line':0,'pred':0})
    const headdata = props.solvedata['headdata'][0]
    const tabledata = props.solvedata['tabledata'][0]

    const title = headdata['title']
    const group = headdata['group']
    const stName = headdata['stName']
    const secondName = headdata['secondName']
    const stData: Array<number>=[]
    const secondData: Array<number> =[]
    const thirdData:Array<String>=[]

    const[savedata,setSavedata]:any =useState({'class':'','title':title,'group':group,'type':'분류하기','friends':{},'friends_id':{},'linepoint':0,'predpoint':0,'write':'','date': new Date()})
    const[mydata,setMydata] =useState({'id':'','name':'','class':''})
    const[studentlist,setList] = useState([])

    const selname = [headdata['1st'],headdata['2nd']]
    const [mainstyle,setmainStyle] = useState({display:"block"})
    const [resultstyle,setresultStyle] = useState({display:"none"})
    const [thirdlist,setThird] =useState()
    const anscout = 7;
    let [point,setfinalPoint]:any =useState(0)

    for(let key in tabledata){
        if(key[0]=='T'){
            stData.push(Number(tabledata[key]))
        }
        else if(key[0]=='S'){
            secondData.push(Number(tabledata[key]))
        }
        else{
            thirdData.push(tabledata[key])
        }
    }


    useEffect(()=>{
        
        const sendData = {_id : localStorage.getItem('token')}

        api.fetchAuth(sendData).then((data)=>{
            if(data.Logined ===true){
                mydata['class'] =data.data.class 
                mydata['id'] =data.data.id
                mydata['name']=data.data.name
                savedata['class'] = data.data.class
                savedata['friends']['my'] = data.data.name
                savedata['friends_id']['my'] = data.data._id 
                setMydata(mydata)
                setSavedata(savedata)
                callapi();
            }
            else{

            } })    
        },[])

        
    const callapi=() =>{
 
        api.fetchLoadClass(mydata['class']).then((data)=>{
            if(data){
                setList(data)
            }
            else{
                console.log('notdata')
            } })    
    }


    const submit =(e:any)=>{

        let answerlist=[]
        for(let key in answer){
            answerlist.push(answer[key])
        }
        for(let i=0; i<anscout;i++){
          if(thirdData[thirdData.length-1-i]==answerlist[answerlist.length-1-i]){
            savedata['predpoint'] = savedata['predpoint']+1
            setfinalPoint(point+1)
          }
        }

        console.log(thirdData)
        console.log(answerlist)
        setSavedata(savedata)
        setmainStyle({display:'none'})
        setresultStyle({display:'block'})
        console.log(savedata)
      
    }

    const maketable =()=>{
        let result = []
        let name=''
        for(let i=0; i < stData.length-anscout; i++){
          //  name = ''
          if(thirdData[i]=='sel1'){name=selname[0]}
          else if(thirdData[i]=='sel2'){name=selname[1]}
          else{name='모릅니다'}
         result.push(<tr key={i}><td className={Styles.td}>{stData[i]}</td><td className={Styles.td}>{secondData[i]}</td><td className={Styles.td}>{name}</td></tr>)}
        return result
    }


    const selectfunc=(e:any)=>{
        let value = e.currentTarget.value.split(',')
        if(value[0]!='선택해주세요'){
            savedata['friends'][e.currentTarget.id] = value[1];
            savedata['friends_id'][e.currentTarget.id] = value[0];
        }

        setSavedata(savedata)
        console.log(savedata)
    }

    const friends =()=>{
        let result =[<option key={-1} value={undefined}>선택해주세요</option>]
        for(let i=0;i<studentlist.length;i++){
            result.push(<option key={i} value={[studentlist[i]['_id'],studentlist[i]['name']]}>{studentlist[i]['name']}</option>)
        }
        return result
    }

    const selectrender=()=>{

        let result=[]
        if(studentlist.length>0){
            for(let i=0; i<6;i++){
                let id = 'sel'+i.toString()
                result.push(<select className={Styles.select} key ={id} id={id} onChange={selectfunc}>{friends()}</select>)
            }
            return result
        }
  
    }

    const senddata =(e:any)=>{
        console.log(savedata)
        api.fetchAddSolveData(savedata).then((data)=>{
            alert('풀이등록완료'); 
            router.push("/")})
        }


    const inputanswer=(e:any)=>{
            answer[e.currentTarget.id] = e.currentTarget.value;
            setAnswer(answer)
            console.log(answer)
    
        }
    
    const answerlist =()=>{
        let result =[<option key={-1} value={undefined}>선택해주세요</option>]
        for(let i=0;i<2;i++){
                result.push(<option key={i} value={'sel'+(i+1).toString()}>{selname[i]}</option>)
        }
        return result
    }




    const answertable =()=>{
            let result = []
            for(let i=0; i <anscout;i++){
                let id = i.toString()
                result.push(<tr key={i}><td>{stData[stData.length-1-i]}</td><td>{secondData[secondData.length-1-i]}</td><td><select  onChange={inputanswer}  id={id}>{answerlist()}</select></td></tr>)
             }  
             return result
        }
        
    const writereason = (e:any)=>{
            savedata['write']= e.target.value;
            setSavedata(savedata)
        }    

    return (
        <>
        <div style ={mainstyle} className={Styles.linermain}>
            <div className={Styles.titlezone}>            
                <div>{title}</div>
                <div>만든모둠:{group}</div>
                <div>표를 보고 예측을 수행해 보세요</div>
                <button className={Styles.subbtn} onClick={submit}>제출하기</button> 
                <div>모둠원 : {selectrender()} </div>

            </div>
            <div className={Styles.tablezone}><table className={Styles.table}><tbody><tr><th>{stName}</th><th>{secondName}</th></tr>{maketable()}</tbody></table></div>
            <div className={Styles.solvezone}><table><tbody><tr><th>{stName}</th><th>{secondName}</th></tr>{answertable()}</tbody></table><input className={Styles.writezone} onChange={writereason} placeholder='이유를 서술해 주세요'></input></div>

        </div>            


        <div className={Styles.result} style={resultstyle}> 
            <div className={Styles.resultzone}>
             <div> 당신의 점수는?? {savedata['predpoint'].toString()+'/7'}</div> 
             <div> 그렇게 생각한 이유는?</div>
             <div> {savedata['write']}</div>  
             <button className={Styles.subbtn} onClick={senddata}>결과 저장하기</button>
            </div>

        </div>


        </>
        )

}


export default Cnnsolve