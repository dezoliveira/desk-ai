'use client'

import { database } from '@/firebaseConfig'
import { get, ref } from 'firebase/database'
import Link from 'next/link'
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
    <main class="wrapper sm:flex sm:justify-center">
      <section class="flex flex-col gap-4">

        <span class="stat-title">
          <h2 class="text-2xl text-center">
            Totais
          </h2>
        </span>

        <div class="stats shadow">
    
          <div class="stat place-items-center">
            <div class="stat-title">Totais</div>
            <div class="stat-value text-primary">{score.total}</div>
            <div class="stat-desc">Do ano de 2024</div>
          </div>

          <div class="stat place-items-center">
            <div class="stat-title">Em aberto</div>
            <div class="stat-value text-secondary">{score.open}</div>
            <div class="stat-desc">Do ano de 2024</div>
          </div>

          <div class="stat place-items-center">
            <div class="stat-title">Em andamento</div>
            <div class="stat-value text-accent">{score.working}</div>
            <div class="stat-desc">Do ano de 2024</div>
          </div>        
          
        </div>

        <span class="stat-title">
          <h2 class="text-2xl text-center">
            Prioridades
          </h2>
        </span>
        
        <div className='stats shadow'>

          <div class="stat">
            <div class="stat-figure text-success">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="stat-title">Alta</div>
            <div class="stat-value text-success">31K</div>
            <div class="stat-desc">Jan 1st - Feb 1st</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-warning">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="stat-title">Média</div>
            <div class="stat-value text-warning">31K</div>
            <div class="stat-desc">Jan 1st - Feb 1st</div>
          </div>
          
          <div class="stat">
            <div class="stat-figure text-error">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="stat-title">Baixa</div>
            <div class="stat-value text-error">31K</div>
            <div class="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        </div>

        <div class="flex justify-center align-center py-10">
          <Link href="/tickets">
            <button className='btn btn-primary'>
              Ver Chamados
            </button>
          </Link>
        </div>
      </section>
      {/* <div>
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
      </div> */}
    </main>
  );
}
