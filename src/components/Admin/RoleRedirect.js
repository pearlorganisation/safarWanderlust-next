"use client"
import React, { useEffect, useState } from "react"

import { usePathname, useRouter } from "next/navigation"

const RoleRedirect = ({role}) => {
    const router = useRouter()
    const pathname = usePathname()
    console.log("the pathname of the page is", pathname)
    
    alert("Cummming bar bar !!")
    
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
        const myData = localStorage.getItem("login_data")||null;
  
        if(!myData)
            router.push("MAnish")

          const parsedData = JSON.parse(myData);
           console.log("Parsed Data:", parsedData);
          if(parsedData?.admin){
             if(parsedData?.admin?.role == "SUPERADMIN"){
                router.push("/admin/dashboard")
          }else{
            router.push("/admin/shubham23mamgain")
          }
        }
    } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
  
      fetchUserData()
    }, [])
    

    return null 
  }
  
  export default RoleRedirect