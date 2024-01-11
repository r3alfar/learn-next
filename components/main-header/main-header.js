import Link from 'next/link'
import Image from 'next/image'

import logoImg from '@/assets/logo.png'
import style from './main-header.module.css'
import MainHeaderBackground from './main-header-background'
import NavLink from './nav-link'

function MainHeader() {

  return (
    <>
      <MainHeaderBackground/>
      <header className={style.header}>
      <Link className={style.logo} href="/">
        <Image src={logoImg} priority alt='headerLogo'/>
        NextLevel Food
      </Link>


      <nav className={style.nav}>
        <ul>
          <li>
            <NavLink href='/meals'>Browse Meals</NavLink>
          </li>
          <li>
            <NavLink href='/community'>Foodies Community</NavLink>
          </li>
        </ul>
      </nav>
      </header>
    </>
    
  )
}

export default MainHeader