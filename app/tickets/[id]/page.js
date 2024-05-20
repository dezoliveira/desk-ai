'use client'

import { database } from "@/firebaseConfig"
import { get, ref } from "firebase/database"
import { useEffect, useState } from "react"

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
      <div className='p-4 d-flex align-items-center justify-content-center'>
          {
            !isLoading && tickets ? <>
              <div key={tickets.id} className='mb-4'>
                <title>{tickets.title}</title>
                <div>
                  <title>{tickets.subtitle}</title>
                  <div>
                    {tickets.body}
                  </div>
                  <span className="d-flex gap-2 align-items-center ">
                    Prioridade: 
                    <div bg={handlePriority(tickets.priority)}>{tickets.priority}</div>
                  </span>
                </div>
            </div>
            </> : ''
          }

        {
          isLoading && tickets &&
          <>
            <span className="visually-hidden">Loading...</span>
          </>
        }
      </div>
    </main>
  )
}