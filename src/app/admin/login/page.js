// "use client"
import Login from '@/components/Admin/Loginpage'
import React from 'react'

const page = () => {
  return (
    <div><Login />
    </div>
  )
}

export default page

// import Login from '@/components/Admin/Loginpage'
// import React from 'react'
// // import { signIn } from "next-auth/react";

// const page =   async () => {
//   return (
//     <div>
//         <Login/>
//     </div>
//   )
//   // await signIn("credentials", {
//   //   redirect: true,
//   //   callbackUrl: "/Dashboard", // or Dashboard path
//   // });
// }

// export default page