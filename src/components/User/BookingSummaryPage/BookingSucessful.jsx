// "use client"

// import React from 'react'
// import Logo  from '@/_assets/svgs/user/GreenTick.svg'
// import { useSearchParams, useParams  } from 'next/navigation'
// import Image from 'next/image'

// function BookingSucessful() {
//     const searchParams = useSearchParams()
//     const txnid = searchParams.get('txnid')
//     // const status = searchParams.get('status')
//     const amount = searchParams.get('amount')
//     const { status } = useParams()

//   return (
//     <div className="w-full h-[50vh] flex flex-col items-center justify-center mb-10">
//       <Image className="h-[60%] block" src={Logo} alt="" />
//       <div className="text-center   ">
//         <p>Itinerary transection ID : {txnid}</p>
//         <h2 className="text-3xl text-center font-bold">
//           Your payment of {amount}/- was {status === 'success' ? 'Successful' : 'Failed'}
//         </h2>
//         {status === 'success' ? (
//           <p className="text-center ">
//             Thank you for your payment. We will send you a conformation mail 
//             shortly.
//           </p>
//         ) : (
//           <p className="w-[60%] mx-auto ">
//             We regret to inform you that your payment could not be processed.
//             <br />Possible reasons: Insufficient funds. Incorrect card details.
//             Network issues. <br />Next Steps: Please try again after checking your payment details. If
//             the issue persists, contact your bank or customer support.
//             Transaction ID: {txnid} For further assistance, please reach out to
//             our support team at [support@example.com]. Thank you for your
//             patience and understanding.
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default BookingSucessful


'use client'

import React from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Logo from '@/_assets/svgs/user/GreenTick.svg'

const BookingSuccessful = ({ status }) => {
  // const searchParams = useSearchParams()

  // const txnid = searchParams.get('txnid')
  const txnid = "searchParams.get('txnid')"
  // const amount = searchParams.get('amount')
  const amount = "searchParams.get('amount')"

  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center mb-10">
      <Image className="h-[60%] block" src={Logo} alt="Success Logo" />
      <div className="text-center">
        <p>Itinerary transaction ID: {txnid}</p>
        <h2 className="text-3xl text-center font-bold">
          Your payment of {amount}/- was {status === 'success' ? 'Successful' : 'Failed'}
        </h2>
        {status === 'success' ? (
          <p className="text-center">
            Thank you for your payment. We will send you a confirmation mail shortly.
          </p>
        ) : (
          <p className="w-[60%] mx-auto">
            We regret to inform you that your payment could not be processed.
            <br />Possible reasons: Insufficient funds. Incorrect card details. Network issues.
            <br />Next Steps: Please try again after checking your payment details. If
            the issue persists, contact your bank or customer support.
            <br />Transaction ID: {txnid}
            <br />For further assistance, please reach out to our support team at <strong>support@example.com</strong>.
          </p>
        )}
      </div>
    </div>
  )
}

export default BookingSuccessful
