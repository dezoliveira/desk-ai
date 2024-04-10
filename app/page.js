'use client'

import { database } from '@/firebaseConfig'
import { get, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// bootstrap components
import { Container, Col, Row, Spinner, Card, Button } from 'react-bootstrap'

export default function Home() {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getNews()
  }, [])

  const getNews = () => {
    const newsRef = ref(database, 'news')
    get(newsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const newsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }))
        setNews(newsArray)
        setIsLoading(false)
      } else {
        setNews([])
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <main>
      <Container className='p-4 d-flex align-items-center justify-content-center'>
        <Col lg={12} md={12} sm={12}>
          {!isLoading && news.map((n) => (
            <Card key={n.id} className='mb-4'>
              <Card.Header>News</Card.Header>
              <Card.Body>
                <Card.Title>{n.title}</Card.Title>
                <Card.Text>
                  {n.body}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col className='text-center'>
        {
          isLoading && news &&
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
