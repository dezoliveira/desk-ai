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
    <main className='form-wrapper'>
      <div className='p-4 d-flex align-items-center justify-content-center'>
        <form onSubmit={handleCreateTicket}>
          <h4>Formulário</h4>
          <div className="mb-3" controlId="formTitle">
            <label>Título</label>
            <input
              type="text"
              placeholder="Ex: Formulário de Cadastro"
              onChange={(e) => setTitle(e.target.value)}
              value={title} 
            />
          </div>

          <div className="mb-3" controlId="formName">
            <label>Autor</label>
            <input
              type="text"
              placeholder="Jon Dee"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </div>

          <div className="mb-3" controlId="formBody">
            <label>Descrição</label>
            <input
              as="textarea"
              aria-label="Ex: O usuário tentou cliclar em cadastrar..."
              onChange={(e) => setBody(e.target.value)}
              value={body}  
            />
          </div>

          <div className="mb-3" controlId="formFiles">
            <label>Arquivo</label>
            <input
              type="file"
              placeholder="Add a File"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3" controlId="formPriority">
            <label>Prioridade</label>
              <select
                aria-label="Selecione uma prioridade"
                onChange={(e) => setPriority(e.target.value)} 
              >
              <option>Selecione uma prioridade</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baixa">Baixa</option>
            </select>
          </div>

          <button variant="primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  )
}