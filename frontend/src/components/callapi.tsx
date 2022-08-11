export const API_ENDPOINT = "13.125.11.249:4000";



export const api = {
    fetchSignIn: (keyword: any) => {
      return fetch(`${API_ENDPOINT}/signin`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          title: keyword
        }),


      }).then(res =>
        res.json()
      )
    },


    fetchAuth: (keyword: any)=> {
      return fetch(`${API_ENDPOINT}/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          title: keyword
        }),

      }).then(res => res.json())
    },


    fetchCheck: (keyword: any)=> {
      return fetch(`${API_ENDPOINT}/check`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          title: keyword
        }),

      }).then(res => res.json())
    },


    fetchLogout: () => {
       return fetch(`${API_ENDPOINT}/logout`)},

 

    fetchLoadTableData: () => {
      return fetch(`${API_ENDPOINT}/loadtabledata`).then(res => res.json())},

    fetchAddTableData: (keyword: any) => {
        return fetch(`${API_ENDPOINT}/addtabledata`, {
      
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: keyword
          }),
      
      
        }).then(res =>
          res.json()
        )
      },

      fetchAddSolveData: (keyword: any) => {
        return fetch(`${API_ENDPOINT}/addsolvedata`, {
      
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: keyword
          }),
      
      
        }).then(res =>
          res.json()
        )
      },


      fetchLoadSolveData: () => {
        return fetch(`${API_ENDPOINT}/loadsolvedata`).then(res => res.json())},
  


    fetchAdduser: (keyword:any)=>{
      return fetch(`${API_ENDPOINT}/addUser`, {
      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: keyword
        }),
    
    
      }).then(res =>
        res.json()
      )
    } ,




    fetchLoadClass: (keyword: any) => {
      return fetch(`${API_ENDPOINT}/loadMyClass`, {
    
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: keyword
        }),
    
    
      }).then(res =>
        res.json()
      )
    }, 


    /*
    fetchLoad: () => {
        return fetch(`${API_ENDPOINT}/users/loadData`).then(res => console.log(res.json()))
     },
     
    fetchInfo: (keyword: any) => {
      return fetch(`${API_ENDPOINT}/users/loadMyData`, {
    
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: keyword
        }),
    
    
      }).then(res =>
        res.json()
      )
    },



    
    fetchSendData: (keyword: any) => {
      return fetch(`${API_ENDPOINT}/users/senddata`, {
    
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: keyword
        }),
    
    
      }).then(res =>
        res.json()
      )
    },

    */
  };