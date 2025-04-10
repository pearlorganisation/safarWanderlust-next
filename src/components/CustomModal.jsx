"use client"

import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
// import CustomText from './CustomText'
import CustomButton from './CustomButton'
import { RxCross2 } from 'react-icons/rx'
// import { Typography } from '@mui/material'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  borderRadius: '10px',
  outline: 'none'
}

const CustomModal = ({
  open,
  handleClose,
  title = 'Customize Trip 🔥',
  description = '',
  restContent,
  backdropvalue = '0.2',
  padding = 5
}) => {
  return (
    <Modal
      open={open}
      
      onClose={(_, reason) => {
        // Prevent closing the modal if the backdrop is clicked
        if (reason === 'backdropClick') return
        handleClose()
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: `rgba(0, 0, 0, ${backdropvalue})`
          }
        }
      }}
    >
      <Box sx={{ ...style, p: padding }}>
        {handleClose && (
          <div className="absolute right-0 top-0 z-10">
            <CustomButton
              onClick={handleClose}
              content={''}
              logo_path={<RxCross2 size={30} color="black" />}
            />
          </div>
        )}
        <div className="custom-scrollbar relative flex max-h-[85vh]  flex-col  justify-start overflow-y-auto p-5 text-center">
          {/* <h2 className="font-nunitoregular400  text-[34px]">{title}</h2> */}
          <div className="font-nunitoregular400 text-[34px]">{title}</div>
          <div className="font-nunitoregular400 text-[12px]">{description}</div>
          {/* <h2 className="font-nunitoregular400  text-[12px]">{description}</h2> */}
          {restContent}
        </div>
      </Box>
    </Modal>
  )
}

export default CustomModal
