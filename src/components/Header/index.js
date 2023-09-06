import React from 'react'

const Header = ({title,subTitle}) => {
  return (
    <div>
        <h5>{title}</h5>
        <p>{subTitle}</p>
    </div>
  )
}

export default Header