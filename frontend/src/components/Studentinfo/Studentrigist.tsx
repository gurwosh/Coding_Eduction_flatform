import { useEffect, useState } from "react"
import { api } from "../callapi"
import Style from '../../styles/Student.module.css'
import Styles from '../../styles/Liner.module.css';

const Studentrigist =()=>{


    const[rigistdata,setRigist] =useState({'id':'','passwords':'','name':'','class':''})
    const[check,setCheck] =useState(false)
    const[studentlist,setList] = useState([])

    useEffect(()=>{
        const sendData = {_id : localStorage.getItem('token')}

        api.fetchAuth(sendData).then((data)=>{
            if(data.Logined ===true){
                rigistdata['class'] =data.data.class 
                setRigist(rigistdata)
                callapi();
            }
            else{

            } })    
    },[])

    const callapi=() =>{
 
        api.fetchLoadClass(rigistdata['class']).then((data)=>{
            if(data){
                setList(data)
            }
            else{
                console.log('notdata')
            } })    
    }

    const changeid=(e:any)=>{
        rigistdata['id'] =e.target.value;
        setRigist(rigistdata)
    }

    const changename =(e:any)=>{
        rigistdata['name'] =e.target.value;
        setRigist(rigistdata)

    }

    const changepassword =(e:any)=>{
        rigistdata['passwords'] =e.target.value;
        setRigist(rigistdata)

    }

    const checked=(e:any)=>{
        api.fetchCheck(rigistdata['id']).then((data)=>{
            if(data['checked']===true){
                alert('이미 있는 ID입니다')
            }
            else{
                alert('사용가능합니다')
                setCheck(true)
            }
        })
    }


    const submit =(e:any)=>{

        if(check == true){
            api.fetchAdduser(rigistdata).then((data)=>{
            
                if(data ===null){
                
                    alert('정보를 다시 확인해주세요')
                
                }
                
                else{
                    alert('학생등록이 완료되었습니다!')
                    setCheck(false);
                    callapi();
                }
                })
        }
        else{
            alert('중복확인을 해주세요!')
        }

    }

    const maketable=()=>{
        let result = []
        for(let i=0; i < studentlist.length; i++){
            result.push(<tr key={i}><td className={Styles.td}>{studentlist[i]['id']}</td><td className={Styles.td}>{studentlist[i]['name']}</td><td className={Styles.td}>{studentlist[i]['passwords']}</td></tr>)}
        return result
    }

    return (
        <>
        <div className={Style.studenttable}><table className={Styles.table}><tbody><tr><th>ID</th><th>이름</th><th>비밀번호</th></tr>{maketable()}</tbody></table></div>
        <div><input className={Style.headinput} onChange={changeid} placeholder="ID를 입력해주세요"></input><input className={Style.headinput}  onChange={changepassword} placeholder="비밀번호를 입력해주세요"></input><input className={Style.headinput} onChange={changename} placeholder="이름을 입력해주세요"></input><button className={Style.btn} onClick={checked}>중복확인</button></div>
        <button className={Style.subbtn} onClick={submit}>학생 등록하기</button>
        </>
    )
    
  
}

export default Studentrigist