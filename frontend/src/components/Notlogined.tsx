import Link from "next/link"
import Styles from '../styles/Notlogin.module.css';

const  Notlogined =()=>{

    return (
    <div className={Styles.main}>
        <div>로그인하세요</div>
        <div className={Styles.gologin}> <Link className={Styles.link} href="/login"><a>로그인 하러 가기</a></Link></div>
    </div>
    
    )
}

export default Notlogined