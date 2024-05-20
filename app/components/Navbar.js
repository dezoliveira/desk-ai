'use client'

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from '@fortawesome/free-solid-svg-icons'


import Link from 'next/link'

export default function MainNavbar() {
  return (
    <main>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a class="btn btn-primary text-xl mx-4">
            <FontAwesomeIcon icon={faBars} />
          </a>
          <nav class="flex items-center align-center gap-4">
            <Link href="/" className='link'>Home</Link>
            <Link href="/tickets" className='link'>Chamados</Link>
            <Link href="/tickets/create">
              <button class='btn btn-primary'>
                Abrir Chamado
              </button>
            </Link>
          </nav>
        </div>
        <div class="flex-none gap-2">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img alt="img_logo" src="/profile-pic.png"/>
              </div>
            </div>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}