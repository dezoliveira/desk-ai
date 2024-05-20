'use client'

// firebase
import { database } from "@/firebaseConfig"
import { get, ref } from "firebase/database"

import { useEffect, useState } from "react"
import Link from 'next/link'
import Image from 'next/image'

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
      <div className='p-4 d-flex align-items-center justify-content-center'>
        <div lg={12} md={12} sm={12}>
          {!isLoading && tickets.map((ticket) => (
            <div key={ticket.id} className='mb-4'>
              <Link href={`/tickets/${ticket.id}`} className="text-decoration-none text-black">
                <div className="card--header">
                  {ticket.title}
                </div>
                <div className="d-flex flex-column gap-2">
                  <div>Criador: {ticket.author}</div>
                  <div>
                    {ticket.body}
                  </div>
                  <span>
                    <Image
                      src={ticket.imageUrl}
                      width={100}
                      height={100}
                      alt="Picture of the author"
                    />
                  </span>
                  <small>Criado em:{ticket.date}</small>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                  <span className="d-flex gap-2 align-items-center ">
                    Prioridade: 
                    <span bg={handlePriority(ticket.priority)}>{ticket.priority}</span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div>
        {
          isLoading && tickets &&
          <>
              <span className="visually-hidden">Loading...</span>
          </>
        }
        </div>
      </div>
    </main>
  )
}