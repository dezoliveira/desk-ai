'use client'

// bootstrap components
import { Container, Navbar, Nav, Button } from 'react-bootstrap'

import Link from 'next/link'

const navColappse = {
  height: '100vh',
  position: 'fixed'
}

export default function MainNavbar() {
  return (
    <main>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <h4 className='m-0'>DESK AI</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='d-flex align-items-center gap-4'>
              <Link href="/">Home</Link>
              <Link href="/tickets">Chamados</Link>
              <Link href="/tickets/create">
                <Button className='btn btn-primary'>
                  Abrir Chamado
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </main>
  )
}