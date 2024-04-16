'use client'

// firebase
import { database, storage } from '@/firebaseConfig'
import { push, ref, set } from 'firebase/database'
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Container, Col, Row, Form, Button } from 'react-bootstrap'

export default function TicketsForm (){
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [body, setBody] = useState("")
  const [priority, setPriority] = useState("")
  const [image, setImage] = useState("")

  const handleCreateTicket = (e) => {
    e.preventDefault()

    const dateNow = new Date().toLocaleDateString()
    const timeNow = new Date().toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    })

    const dateTime = dateNow + ' ás ' + timeNow

    // Corrigir
    const storageRef = sRef(storage, 'images/' + image.name)

    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(storageRef)
      .then((url) => {
        try {
          const ticketsRef = ref(database, 'tickets')
          const newTicketsRef = push(ticketsRef)
    
          set (newTicketsRef, {
            title: title,
            author: author,
            body: body,
            priority: priority,
            imageUrl: url,
            date: dateTime
          })
    
          clearStates()
    
        } catch (error) {
          console.log('Firebase error:' + error)
        }
      }).catch((error) => {
        console.log(error + 'Upload image error!')
      })
    })
  }

  const clearStates = () => {
    setTitle("")
    setAuthor("")
    setBody("")
    setPriority("")

    setTimeout(() => {
      router.push('/tickets')
    }, 2000);
  }

  // handle prepare image if have image
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <main>
      <Container className='p-4 d-flex align-items-center justify-content-center'>
        <Col lg={8} md={8} sm={12}>
          <Row>
            <Form onSubmit={handleCreateTicket}>
              <h4>Formulário</h4>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Formulário de Cadastro"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title} 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Jon Dee"
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
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

              <Form.Group className="mb-3" controlId="formFiles">
                <Form.Label>Arquivo</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Add a File"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPriority">
                <Form.Label>Prioridade</Form.Label>
                  <Form.Select
                    aria-label="Selecione uma prioridade"
                    onChange={(e) => setPriority(e.target.value)} 
                  >
                  <option>Selecione uma prioridade</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baixa">Baixa</option>
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