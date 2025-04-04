import React from 'react'

export default function PersonWithStar({ color = '#3F3F44' }) {
  return (
    <div>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_280_6385)">
          <path
            d="M16 18.6667V21.3333C13.8782 21.3333 11.8434 22.1762 10.3431 23.6765C8.84283 25.1768 7.99998 27.2116 7.99998 29.3333H5.33331C5.33331 26.5044 6.45712 23.7912 8.45751 21.7909C10.4579 19.7905 13.171 18.6667 16 18.6667ZM16 17.3333C11.58 17.3333 7.99998 13.7533 7.99998 9.33333C7.99998 4.91333 11.58 1.33333 16 1.33333C20.42 1.33333 24 4.91333 24 9.33333C24 13.7533 20.42 17.3333 16 17.3333ZM16 14.6667C18.9466 14.6667 21.3333 12.28 21.3333 9.33333C21.3333 6.38666 18.9466 3.99999 16 3.99999C13.0533 3.99999 10.6666 6.38666 10.6666 9.33333C10.6666 12.28 13.0533 14.6667 16 14.6667ZM24 28.6667L20.0813 30.7267L20.8293 26.364L17.66 23.2733L22.0413 22.636L24 18.6667L25.96 22.636L30.34 23.2733L27.1706 26.364L27.9173 30.7267L24 28.6667Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_280_6385">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
