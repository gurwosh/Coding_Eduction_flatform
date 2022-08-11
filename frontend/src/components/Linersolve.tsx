import router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Styles from '../styles/Liner.module.css';
import { api } from './callapi';

const Linersolve = (props:{solvedata:any}) =>{

    const canvas_width = 800;
    const canvas_heigth =250;

    const canvasRef:any = useRef(null);
    const contextRef = useRef(null);
    const[ctx,setCtx]:any = useState();
    const[answer,setAnswer]:any = useState({'0': 0,'1':0, '2':0,'3':0,'4':0, '5':0,'6':0})
    const canvasRef2:any = useRef(null);
    const contextRef2 = useRef(null);
    const[ctx2,setCtx2]:any = useState();
    const[lex,setLex]:any = useState({x:0,y:0,endx:0, endy:0})
    const[finalpoint,setPoint] = useState({'line':0,'pred':0})

    const headdata = props.solvedata['headdata'][0]
    const tabledata = props.solvedata['tabledata'][0]

    const title = headdata['title']
    const group = headdata['group']
    const stName = headdata['stName']
    const secondName = headdata['secondName']
    const stData: Array<number>=[]
    const secondData: Array<number> =[]
    
    const[savedata,setSavedata]:any =useState({'class':'','title':title,'group':group,'type':'예측하기','friends':{},'friends_id':{},'linepoint':0,'predpoint':0,'write':'','date': new Date()})
    const[mydata,setMydata] =useState({'id':'','name':'','class':''})

    let [count,setCount]:any = useState(0)

    const anscout = 7;
    
    const [ linestyle, setlineStyle ] = useState({display: 'block'})
    const [predstyle,setpredStyle] =useState({display: 'none'})
    const [mainstyle,setmainStyle] = useState({display:"block"})
    const [resultstyle,setresultStyle] = useState({display:"none"})
    const[studentlist,setList] = useState([])

    for(let key in tabledata){
        if(key[0]=='T'){
            stData.push(Number(tabledata[key]))
        }
        else{
            secondData.push(Number(tabledata[key]))
        }
    }


    const first_max = Math.max.apply(null,stData);
    const first_min =  Math.min.apply(null,stData);
    const second_max =  Math.max.apply(null,secondData);
    const second_min =  Math.min.apply(null,secondData);


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


        const canvas = canvasRef.current;
        const canvas2 = canvasRef2.current;

        canvas2.width = canvas_width;
        canvas2.height =canvas_heigth;

        canvas.width = canvas_width;
        canvas.height= canvas_heigth;


        const ctx = canvas.getContext("2d");
        const ctx2 = canvas2.getContext("2d");

        canvas2.onclick =(e:any)=>{
            count+=1
            setCount(count)
            if(count %2 !=0){

                // this.DrawChart(canvas, this.data, ctx)
                 ctx2.clearRect(0,0,canvas2.width,canvas2.height);
 
 
                 lex.x = e.offsetX
                 lex.y = e.offsetY
     
                 ctx2.beginPath();
                 
                 ctx2.moveTo(lex.x,lex.y);
                 ctx2.arc(lex.x,lex.y, 3, 0, 2*Math.PI);
                 ctx2.stroke();
     
                 ctx2.fillStyle = 'blue';
                 ctx2.fill();
 
             }

             if(count %2 ==0){
                lex.endx = e.offsetX;
                lex.endy = e.offsetY;


                ctx2.arc(lex.endx,lex.endy, 3, 0, 2*Math.PI);
                ctx2.stroke();
 
                ctx2.fillStyle = 'blue';
                ctx2.fill();

                ctx2.lineTo(lex.endx,lex.endy);
                ctx2.stroke();
                setLex(lex)
            }
             
        }



        for(let i=0;i<stData.length-anscout;i++){

            let x = (stData[i]-first_min)/(first_max+first_min)*canvas.width;
            let y =  canvas_heigth - (secondData[i]-second_min)/(second_max+second_min)*canvas.height;
            ctx.beginPath();
            ctx.fillRect(x,y, 8, 8);
            ctx.stroke()
            
            ctx.fillStyle = 'aqua';
            ctx.lineWidth = 0; 
            ctx.fill();

        }
        contextRef.current = ctx;
        contextRef2.current = ctx2;
        setCtx(contextRef.current)
        setCtx2(contextRef2.current)
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

    const maketable =()=>{
        let result = []
        for(let i=0; i < stData.length-anscout; i++){
            result.push(<tr key={i}><td className={Styles.td}>{stData[i]}</td><td className={Styles.td}>{secondData[i]}</td></tr>)}
        return result
    }

    const submit =(e:any)=>{
        let predanswer = []

        for(let i=0; i<anscout;i++){
            predanswer.push(secondData[secondData.length-1-i])
        }
        let lineanswer = LinearRegression({x:stData , y:secondData})
        let Delta = ((250 - lex.endy)-(250-lex.y))/(lex.endx-lex.x);
        let linePoint = 100-Math.abs(lineanswer.slope - (Delta*canvas_width/canvas_heigth))*100

        let predPoint = 0;

        console.log(predanswer)
        console.log(answer)


        for( let i =0 ; i<anscout ; i++){
            predPoint += Math.abs(predanswer[i] - Number(answer[`${i}`]))
        }
        predPoint = (100-(predPoint/anscout));
        
        if(count!=0 && count%2==0){
            savedata['linepoint'] =linePoint;
            savedata['predpoint'] = predPoint;
            setPoint({'line':linePoint,'pred':predPoint})
            setSavedata(savedata)
            setmainStyle({display:'none'})
            setresultStyle({display:'block'})
        }
        else{
            alert('선을 바르게 그려주세요')
        }
  
    }

    



    const utils = {
        sum: (arr: any[]) => arr.reduce((total: any, amount: any) => total + amount),
        avg: (arr: any[]) => utils.sum(arr) / arr.length
    }
    
    const LinearRegression = (data: { x: any[]; y: any[]; }) => {
        
        let
            x_avg: number, 		
            y_avg: number, 		
            num, 		  
            den, 	    
            m: number, 		    // slope
            b: number, 		    // intercept
            sse 		 
        
        x_avg = utils.avg(data.x)
        y_avg = utils.avg(data.y)
        num = utils.sum(data.x.map((x: number, i: number) => (x - x_avg) * (data.y[i] - y_avg)))
        den = utils.sum(data.x.map((x: number) => ((x - x_avg) ** 2)))
        
    
        if (num === 0 && den === 0) {
            m = 0
            b = data.x[0]
            
        }
        else {
            m = num / den
            b = y_avg - m * x_avg
        }
        
        
        sse = utils.sum(data.y.map((y: number, i: any) => (y - (m * data.x[i] + b)) * 2))
        
        return {
            slope: m,
            intercept: b,
            y: `${m}x + ${b}`,
            SSE: `${sse}`
        }
    }



    const drawline =(e:any)=>{
        setlineStyle({display:'block'})
        setpredStyle({display:'none'})
    }

    const predict=(e:any) =>{
        setlineStyle({display:'none'})
        setpredStyle({display:'block'})
    }


    const inputanswer=(e:any)=>{
        answer[e.target.id] = e.target.value;
        setAnswer(answer)

    }


    const answertable =()=>{
        let result = []
        for(let i=0; i <anscout;i++){
            let id = i.toString()
            result.push(<tr key={i}><td>{stData[stData.length-1-i]}</td><td><input id={id} onChange={inputanswer} type='number'></input></td></tr>)
         }  
         return result
    }


    const writereason = (e:any)=>{
        savedata['write']= e.target.value;
        setSavedata(savedata)
    }



    const solverender=()=>{
        return(
            <>
            <div style={linestyle} className={Styles.canvaszone}> <canvas className={Styles.LowerCanvas} ref={canvasRef}></canvas><canvas className={Styles.UpCanvas} ref={canvasRef2}></canvas></div>
            <div style={predstyle}><table><tbody><tr><th>{stName}</th><th>{secondName}</th></tr>{answertable()}</tbody></table><input className={Styles.writezone}  onChange={writereason} placeholder='이유를 서술해 주세요'></input></div>
            </>
        )
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

    return (

        <>
        <div style={mainstyle} className={Styles.linermain}>
            <div className={Styles.titlezone}>            
                <div>제목: {title}</div>
                <div>만든모둠:{group}</div>
                <div>표를 보고 점들을 대표하는 선을 그린후, 예측을 수행해 보세요</div>
                <button className={Styles.subbtn}  onClick={submit}>제출하기</button> <button className={Styles.linerbtn} onClick={drawline}>대표선 그리기</button> <button className={Styles.linerbtn} onClick={predict}>값예측하기</button>
                <div>모둠원 : {selectrender()} </div>

            </div>

            <div className={Styles.tablezone}><table className={Styles.table}><tbody><tr><th>{stName}</th><th>{secondName}</th></tr>{maketable()}</tbody></table></div>
            
            <div className={Styles.solvezone}>{solverender()}</div>
        </div>
        <div className={Styles.result} style={resultstyle}> 
            <div> 당신의 점수는?? {Math.floor(finalpoint.line)} + {Math.floor(finalpoint.pred)} = {Math.floor(finalpoint.line)+Math.floor(finalpoint.pred)}</div> 
            <div> 그렇게 생각한 이유는?</div>
            <div> {savedata['write']}</div>  
            <button className={Styles.subbtn} onClick={senddata}>결과 저장하기</button>
        </div>
        </>
    )

}


export default Linersolve