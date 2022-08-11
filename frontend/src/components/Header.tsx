import Link from 'next/link';
import Style from '../styles/Home.module.css'

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div className={Style.header}>
    <div> AI학습 및 평가를 위한 실시간 협업시스템 </div>

  </div>
);

export default Header;