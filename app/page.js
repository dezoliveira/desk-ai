'use client'

import { database } from '@/firebaseConfig'
import { get, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// bootstrap components
import { Container, Col, Row, Spinner } from 'react-bootstrap'

const maxContain = {
  height: '90vh'
}

export default function Home() {
  const [score, setScore] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getScore()
  }, [])

  const getScore = () => {
    const scoreRef = ref(database, 'dashboard/score')
    get(scoreRef).then((snapshot) => {
      if (snapshot.exists()) {
        const scoreArray = snapshot.val()
        console.log(scoreArray)
        setScore(scoreArray)
        setIsLoading(false)
      } else {
        setScore([])
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <main>
      <Container className='p-4 d-flex align-items-center justify-content-center'  style={maxContain}>
        <Col lg={12} md={12} sm={12} className='d-flex gap-4'>
          <Row>
            <h1>Totais:</h1>
            <h2>Total de chamados: {score.total}</h2>
            <h2>Em aberto: {score.open}</h2>
            <h2>Em andamento: {score.working}</h2>
          </Row>
          <Row>
            <h1>Prioridades:</h1>
            <h2>Alta: {score.high}</h2>
            <h2>Media: {score.medium}</h2>
            <h2>Baixa: {score.low}</h2>
          </Row>
        </Col>
        <Col className='text-center'>
        {
          isLoading && score &&
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        }
        </Col>
      </Container>
    </main>
  );
}
