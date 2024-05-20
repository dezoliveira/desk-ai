'use client'

import { database } from '@/firebaseConfig'
import { get, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
      <div>
        <h1>Totais:</h1>
        <h2>Total: {score.total}</h2>
        <h2>Em aberto: {score.open}</h2>
        <h2>Em andamento: {score.working}</h2>
        <h1>Prioridades:</h1>
        <span>
          <h2>Alta: {score.high}</h2>
        </span>
        <span>
          <h2>Media: {score.medium}</h2>
        </span>
        <span>
          <h2>Baixa: {score.low}</h2>
        </span>
        {
          isLoading && score &&
          <>
              <span className="visually-hidden">Loading...</span>
          </>
        }
      </div>
    </main>
  );
}
