'use client'

import { database } from "@/firebaseConfig"
import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"

// bootstrap components
import { Container, Card, Col, Button, Spinner, Badge } from 'react-bootstrap'

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getTickets()
  }, [])

  const getTickets = () => {
    const ticketsRef = ref(database, 'tickets')
    get(ticketsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const ticketsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data
        }))
        setTickets(ticketsArray)
        setIsLoading(false)
      } else {
        setTickets([])
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const handlePriority = (value) => {
    if (value) {
      if (value === 'Alta') return 'danger'
      if (value === 'Media') return 'warning'
      if (value === 'Baixa') return 'success'
    }
  }

  return(
    <main>
      <Container className='p-4 d-flex align-items-center justify-content-center'>
        <Col lg={12} md={12} sm={12}>
          {!isLoading && tickets.map((ticket) => (
            <Card key={ticket.id} className='mb-4'>
              <Card.Header>{ticket.title}</Card.Header>
              <Card.Body>
                <Card.Title>{ticket.subtitle}</Card.Title>
                <Card.Text>
                  {ticket.body}
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
                <span className="d-flex gap-2 align-items-center ">
                  Prioridade: 
                  <Badge bg={handlePriority(ticket.priority)}>{ticket.priority}</Badge>
                </span>
              </Card.Body>
            </Card>
          ))}
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