'use client'

import { database } from '@/firebaseConfig'
import { get, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// bootstrap components
import { Container, Col, Row, Spinner, ProgressBar } from 'react-bootstrap'

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

  const max = score.total

  return (
    <main>
      <Container className='p-4 d-flex align-items-center justify-content-center'  style={maxContain}>
        <Col lg={12} md={12} sm={12} className='d-flex gap-4'>
          <Col>
            <Row className='d-flex justify-content-around gap-4'>
              <h1>Totais:</h1>
              <Row>
                <h2>Total: {score.total}</h2>
                <ProgressBar variant="primary" now={100}/>
              </Row>

              <Row>
                <h2>Em aberto: {score.open}</h2>
                <ProgressBar variant="info" now={100}/>
              </Row>

              <Row>
                <h2>Em andamento: {score.working}</h2>
                <ProgressBar variant="info" now={0}/>
              </Row>

            </Row>
          </Col>
          <Col>
            <Row className='d-flex justify-content-around gap-4'>
              <h1>Prioridades:</h1>
              <Row>
                <h2>Alta: {score.high}</h2>
                <ProgressBar variant="danger" now={100}/>
              </Row>
              <Row>
                <h2>Media: {score.medium}</h2>
                <ProgressBar variant="warning" now={100}/>
              </Row>
              <Row>
                <h2>Baixa: {score.low}</h2>
                <ProgressBar variant="success" now={100}/>
              </Row>
            </Row>
          </Col>
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
