import React from 'react'
import spinner from './spinner-loading.gif'
export default function Spinner() {
  return (
    <div>
      <img 
        src={spinner}
        style={{width: '100px', margin:'auto', display: 'block'}}
        alt= 'Loading ...'
      />
    </div>
  )
}
