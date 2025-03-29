import React from 'react'
import Logo  from '../../../assets/svgs/user/GreenTick.svg'
import { useLocation } from 'react-router-dom'

function BookingSucessful() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const txnid = queryParams.get('txnid')
    const status = queryParams.get('status')
    const amount = queryParams.get('amount')
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center mb-10">
      <img className="h-[60%] block" src={Logo} alt="" />
      <div className="text-center   ">
        <p>Itinerary transection ID : {txnid}</p>
        <h1 className="text-3xl text-center font-bold">
          Your payment of {amount}/- was {status === 'success' ? 'Successful' : 'Failed'}
        </h1>
        {status === 'success' ? (
          <p className="text-center ">
            Thank you for your payment. We will send you a conformation mail 
            shortly.
          </p>
        ) : (
          <p className="w-[60%] mx-auto ">
            We regret to inform you that your payment could not be processed.
            <br />Possible reasons: Insufficient funds. Incorrect card details.
            Network issues. <br />Next Steps: Please try again after checking your payment details. If
            the issue persists, contact your bank or customer support.
            Transaction ID: {txnid} For further assistance, please reach out to
            our support team at [support@example.com]. Thank you for your
            patience and understanding.
          </p>
        )}
      </div>
    </div>
  )
}

export default BookingSucessful