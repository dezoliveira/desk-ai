'use client'

import { database } from '@/firebaseConfig'
import { get, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// bootstrap components
import { Container, Col, Row, Spinner } from 'react-bootstrap'

export default function Home() {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getNews()
  }, [])

  const getNews = () => {
    const userRef = ref(database, 'news')
    get(userRef).then((snapshot) => {
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
      <Container fluid className='p-4'>
        <Col lg={12} md={12} sm={12} className='d-flex flex-column'>
          {!isLoading && news.map((n) => (
            <div key={n.id}>
              <h1>{n.title}</h1>
              <h4>{n.body}</h4>
            </div>
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
