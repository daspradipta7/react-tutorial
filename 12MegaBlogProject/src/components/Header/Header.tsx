import React from 'react'
import Container from '../Container'
import Logo from '../Logo'
import { Link, useNavigate } from 'react-router-dom'
import type { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import LogoutBtn from '../LogoutBtn'

function Header() {
  const authStatus = useSelector((state: RootState) => state.auth.status && state.auth.user !== null)
  const navigate = useNavigate()

  

  const navItems = [
    { name: 'Home', active: true, slug: '/' },
    { name: 'Login', active: !authStatus, slug: '/login' },
    { name: 'Sign Up', active: !authStatus, slug: '/signup' },
    { name: "All Posts", active: authStatus, slug: "/posts" },
    { name: "Create Post", active: authStatus, slug: "/posts/new" },
  ]
  return (
    <header>
      <Container>
          <nav>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='150px' height='50px' />
              </Link>
            </div>
            <ul
              className='flex items-center gap-4 text-sm font-medium text-gray-900'
            >
              {
                navItems.map((item) => (
                  item.active && (
                    <li key={item.name}>
                      <button onClick={() => navigate(item.slug)} className='duration-200 hover:text-blue-500'>
                        {item.name}
                      </button>
                    </li>
                  ))
                )
              }
              {authStatus && (
                  <li> <LogoutBtn /></li>
              )}
            </ul>
          </nav>
      </Container>
    </header>
  )
}

export default Header