'use client'

import Link from 'next/link'

const navColappse = {
  height: '100vh',
  position: 'fixed'
}

export default function MainNavbar() {
  return (
    <main>
      <div>
        <div>
          <span>
            <h4 className='m-0 text-white'>DESK AI</h4>
          </span>
          <span id="basic-navbar-nav">
            <nav className='d-flex align-items-center gap-4'>
              <Link href="/" className='link'>Home</Link>
              <Link href="/tickets" className='link'>Chamados</Link>
              <Link href="/tickets/create">
                <button variant='danger'>
                  Abrir Chamado
                </button>
              </Link>
            </nav>
          </span>
        </div>
      </div>
    </main>
  )
}