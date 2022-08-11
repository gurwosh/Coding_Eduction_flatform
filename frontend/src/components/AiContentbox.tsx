import Style from '../styles/Aibox.module.css'


const AiContentbox=(props:{boxdata:any})=>{
    
    const typerender=()=>{
        if(props.boxdata['headdata'][0]['type']=='cnn'){
            return <div>분류하기</div>
        }
        else{
            return <div>선그려 예측하기</div>
        }
    }


    const imagerender=()=>{
        if(props.boxdata['headdata'][0]['type']=='cnn'){
            return <img className={Style.aiImage}  src="knn.png" />
        }
        else{
            return <img className={Style.aiImage}  src="line.png" />
        }   
    }


    const typerender2=()=>{
        if(props.boxdata['headdata'][0]['type']=='cnn'){
            return (<div>
                {props.boxdata['headdata'][0]['1st']} 와/과 {props.boxdata['headdata'][0]['2nd']} 을 분류하기
                </div>)
        }
        else{
            return (<div>
            {props.boxdata['headdata'][0]['stName']} 와/과 {props.boxdata['headdata'][0]['secondName']} 을 비교해 예측하기
            </div>)
        }
    }

    return(
        <div  className={Style.aibox} >
            <div>제목: {props.boxdata['headdata'][0]['title']}     제작모둠: {props.boxdata['headdata'][0]['group']}</div> 

           
            
                {typerender()}
            <div className={Style.imagebox}>
                {imagerender()}
            </div>
                {typerender2()}
            
        </div>
    )
}



export default AiContentbox