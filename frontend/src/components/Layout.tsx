import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Style from '../styles/Home.module.css'


const Layout = (props: { content:  ReactElement<any, string | JSXElementConstructor<any>>}) => (
  <div className={Style.main} >
    <Header />
    <div className={Style.contents}>
    {props.content}
    </div>
    <Navbar />
  </div>
)

export default Layout