import React from 'react'
import networkEnum from '../../networkEnum'
import BNLogo from '../../icons/logo.png'
import avatarPlaceholder from '../../icons/avatar-placeholder.png'
import './Header.css'

const Header = props => {
  const { connectedChain, address, balance, ens } = props

  return (
    <header className="user-info-container">
      <a
  
      >
        <img className="bn-logo-demo" src={BNLogo} alt="Simple AI Collection Logo" />
      </a>

    </header>
  )
}

export default Header
