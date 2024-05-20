'use client'

// firebase
import { database, storage } from '@/firebaseConfig'
import { push, ref, set, get, update, child } from 'firebase/database'
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function TicketsForm (){
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [body, setBody] = useState("")
  const [priority, setPriority] = useState("")
  const [image, setImage] = useState("")

  const comboPriorities = {

  }

  const updateScore = () => {
    const scoreRef = ref(database, 'dashboard/score')
    const newScoreRef = push(scoreRef)

    get(scoreRef).then((snapshot) => {

      if (snapshot.exists()) {
        const scoreArray = snapshot.val()

        update(scoreRef, {
          high: scoreArray.high + (priority === 'Alta' ? 1 : 0),
          low: scoreArray.low + (priority === 'Baixa' ? 1 : 0),
          medium: scoreArray.medium + (priority === 'Media' ? 1 : 0),
          open: scoreArray.open + 1,
          total: scoreArray.total + 1,
        })

      } else {
        set (newScoreRef, {
          done: 0,
          high: 0,
          low: 0,
          medium: 0,
          open: 0,
          total: 0,
          working: 0
        })
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleCreateTicket = (e) => {
    e.preventDefault()

    updateScore()

    const dateNow = new Date().toLocaleDateString()
    const timeNow = new Date().toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    })

    const dateTime = dateNow + ' ás ' + timeNow

    // Corrigir
    const storageRef = sRef(storage, 'images/' + image.name)

    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(storageRef)
      .then((url) => {
        try {
          const ticketsRef = ref(database, 'tickets')
          const newTicketsRef = push(ticketsRef)
    
          set (newTicketsRef, {
            title: title,
            author: author,
            body: body,
            priority: priority,
            imageUrl: url,
            date: dateTime
          })
    
          clearStates()
    
        } catch (error) {
          console.log('Firebase error:' + error)
        }
      }).catch((error) => {
        console.log(error + 'Upload image error!')
      })
    })
  }

  const clearStates = () => {
    setTitle("")
    setAuthor("")
    setBody("")
    setPriority("")

    setTimeout(() => {
      router.push('/tickets')
    }, 2000);
  }

  // handle prepare image if have image
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <main class='wrapper flex items-center justify-center'>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        {/* Form de Criação de Tickets */}
        <form class="card-body" onSubmit={handleCreateTicket}>
          {/* Titulo */}
          <div class="form-control">
            <label class="label">
              <span class="label-text">Título</span>
            </label>
            <input
              type="text"
              placeholder="Erro 404"
              class="input input-bordered"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title} 
            />
          </div>

          {/* Autor */}
          <div class="form-control">
            <label class="label">
              <span class="label-text">Autor</span>
            </label>
            <input
              type="text"
              placeholder="John Dee"
              class="input input-bordered"
              required
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </div>

          {/* Descrição */}
           <div class="form-control">
            <label class="label">
              <span class="label-text">Descrição</span>
            </label>
            <textarea
              placeholder="Esse chamado contém spoiler [...]"
              class="textarea textarea-bordered h-24"
              required
              onChange={(e) => setBody(e.target.value)}
              value={body}
            >
            </textarea>
          </div>

          {/* Prioridades */}
          <div class="form-control">
            <label class="label">
              <span class="label-text">Prioridades</span>
            </label>
            <select
              class="select select-bordered w-full max-w-xs"
              onChange={(e) => setPriority(e.target.value)} 
            >
              <option selected>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </div>

          {/* File */}
          <div class="form-control">
            <label class="label">
              <span class="label-text">Arquivo</span>
            </label>
            <input
              type="file"
              class="file-input file-input-bordered file-input-primary w-full max-w-xs"
              onChange={handleChange}
            />
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary">Criar</button>
          </div>
        </form>
      </div>
    </main>
  )
}