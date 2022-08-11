import { useEffect, useState } from "react"
import { render } from "react-dom"
import { api } from "../callapi"
import Style from '../../styles/Info.module.css'


const Studentsolve =()=>{

    const [solvedata,setSolvedata]:any = useState([])
    const [namelist,setNamelist]:any = useState({})
    const [classname,setClass] = useState({'class':''})

    useEffect(()=>{
        const myid = {_id : localStorage.getItem('token')}

        api.fetchAuth(myid).then(data=>{
            classname['class'] = data.data.class
            setClass(classname)
            callapi();
        })

    },[])


    const callapi=()=>{
        api.fetchLoadSolveData().then(data=>{
            setSolvedata(data)
            for(let i=0;i<data.length;i++){
                namelist[i] = data[i]['friends']
                setNamelist(namelist)
            }
        })
    }


    const Solvename =(props:{i:any}):any=>{
        let result =[]
        let list = namelist[props.i]
        for(let key in list){
            result.push(<div key={key}>{list[key]}</div>)
        }

        return result
    }

    const selrender =(i:any) =>{
        if(solvedata[i]['type']=='예측하기'){
            return  <div> 선그리기 점수: {Math.floor(solvedata[i]['linepoint'])}  예측점수: {Math.floor(solvedata[i]['predpoint'])} </div>
        }
        else{
            return  <div> 맞은 개수: {solvedata[i]['predpoint']} / 7 </div>
        }

    }




    const render=()=>{
        console.log(solvedata)
        let result=[]
        for(let i=0; i<solvedata.length;i++){

            if(solvedata[i]['class']==classname['class']){
                result.push(
                    <div key ={i} className={Style.solvebox}>
                        <div> 제목: {solvedata[i]['title']}  </div>
                        <div> 종류 : {solvedata[i]['type']}</div>
                        <div className={Style.solvename}> 푼사람: <Solvename i={i} /></div>
                        <div> 학년반: {solvedata[i]['class']} </div>
                        {selrender(i)}
                        <div>푼날짜 : {solvedata[i]['date']}</div>
                        <div> 찾은 규칙: {solvedata[i]['write']}</div>
                    </div>
                )

            }

        }

        return result
    }

    return (
    <div className={Style.infomain}>
        {render()}
    </div>
    )
}

export default Studentsolve