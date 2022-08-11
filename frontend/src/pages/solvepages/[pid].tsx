import { useRouter } from "next/router";
import Layout from '@/components/Layout'
import Cnnsolve from "@/components/Cnnsolve";
import Linersolve from "@/components/Linersolve";
import { useState, useEffect } from "react"
import { api } from "@/components/callapi";
import { type } from "os";


const Solvepage = () =>{
    const router = useRouter();
    const[solvepagedata,setData]:any = useState({})
    const { pid } = router.query;


    useEffect(()=>{
        api.fetchLoadTableData().then((data)=>{
            setData(data[Number(pid?.slice(3,pid.length))]);
        
        })
    },[])

    const render= ()=>{
        if(Object.keys(solvepagedata).length != 0){
            if(solvepagedata['headdata'][0]['type']=='liner'){
                return <Linersolve solvedata={solvepagedata}/>
            }
            else if(solvepagedata['headdata'][0]['type']=='cnn'){
                return <Cnnsolve solvedata={solvepagedata}/>
            }

        }

        return <div></div>
    }

    return(
        <Layout content={render()}/>
    )
}




  export async function getServerSideProps({ query: { pid }}:any) {
    return {
      props: {
        pid,
      },
    };
  }

export default Solvepage