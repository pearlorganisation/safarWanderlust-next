"use client"

import { useDispatch, useSelector } from 'react-redux'
import { setValue } from '@/lib/globalSlice'

export const showConfirmationDialog = (dispatch) => {
    return new Promise((resolve) => {
      dispatch(setValue({ key: 'to_show_dialog', value: true }))
  
      const confirmListener = (event) => {
        resolve(event.detail)
  
        window.removeEventListener('confirm', confirmListener)
      }
  
      window.addEventListener('confirm', confirmListener)
    })
  }