'use client'

import { database } from '@/firebaseConfig'
import { push, ref, set } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Container, Col, Row, Form, Button } from 'react-bootstrap'

export default function TicketsForm (){
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [body, setBody] = useState("")
  const [priority, setPriority] = useState("")

  const handleCreateTicket = (e) => {
    e.preventDefault()

    try {
      const ticketsRef = ref(database, 'tickets')
      const newTicketsRef = push(ticketsRef)

      set (newTicketsRef, {
        title: title,
        subtitle: subtitle,
        body: body,
        priority: priority
      })

      clearStates()

    } catch (error) {
      console.log('Firebase error:' + error)
    }
  }

  const clearStates = () => {
    setTitle("")
    setSubtitle("")
    setBody("")
    setPriority("")

    setTimeout(() => {
      router.push('/tickets')
    }, 2000);

  }

  return (
    <main>
      <Container className='p-4 d-flex align-items-center justify-content-center'>
        <Col lg={8} md={8} sm={12}>
          <Row>
            <Form onSubmit={handleCreateTicket}>
              <h4>Formulário</h4>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Formulário de Cadastro"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title} 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubtitle">
                <Form.Label>Subtítulo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: 404 not found"
                  onChange={(e) => setSubtitle(e.target.value)}
                  value={subtitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBody">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  aria-label="Ex: O usuário tentou cliclar em cadastrar..."
                  onChange={(e) => setBody(e.target.value)}
                  value={body}  
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPriority">
                <Form.Label>Prioridade</Form.Label>
                  <Form.Select
                    aria-label="Selecione uma prioridade"
                    onChange={(e) => setPriority(e.target.value)} 
                  >
                  <option>Selecione uma prioridade</option>
                  <option value="1">Alta</option>
                  <option value="2">Media</option>
                  <option value="3">Baixa</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Row>
        </Col>
      </Container>
    </main>
  )
}