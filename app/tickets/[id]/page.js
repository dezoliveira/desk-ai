'use client'

import { database } from "@/firebaseConfig"
import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"

// bootstrap components
import { Container, Card, Col, Button, Spinner, Badge } from 'react-bootstrap'

export default function TicketsDetails({params}) {
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useState(() => {
    const ticketsRef = ref(database, 'tickets/' + params.id)
    get(ticketsRef).then((snapshot) => {
      if(snapshot.exists()) {
        const ticket = snapshot.val()
        console.log(ticket)
        setTickets(ticket)
        setIsLoading(false)
      }
    })
  }, [])


  const handlePriority = (value) => {
    if (value) {
      if (value === 'Alta') return 'danger'
      if (value === 'Media') return 'warning'
      if (value === 'Baixa') return 'success'
    }
  }
  
  return (
    <main>
      <Container className='p-4 d-flex align-items-center justify-content-center'>
        <Col lg={12} md={12} sm={12}>
          {
            !isLoading && tickets ? <>
              <Card key={tickets.id} className='mb-4'>
                <Card.Header>{tickets.title}</Card.Header>
                <Card.Body>
                  <Card.Title>{tickets.subtitle}</Card.Title>
                  <Card.Text>
                    {tickets.body}
                  </Card.Text>
                  <span className="d-flex gap-2 align-items-center ">
                    Prioridade: 
                    <Badge bg={handlePriority(tickets.priority)}>{tickets.priority}</Badge>
                  </span>
                </Card.Body>
            </Card>
            </> : ''
          }
        </Col>

        <Col className='text-center'>
        {
          isLoading && tickets &&
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        }
        </Col>
      </Container>
    </main>
  )
}