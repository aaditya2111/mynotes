import React, { useState, useEffect }  from 'react'
//import notes from '../assets/data';
import { Link, useParams, useNavigate} from 'react-router-dom'
import { ReactComponent  as ArrowLeft} from '../assets/arrow-left.svg'


const NotePage = () => {
  const {id} = useParams();
  
  let navigate = useNavigate();
  
  //let [error, setError] = React.useState(null);
  //console.log (id)
  //const note = notes.find(note => note.id === Number(id))
  let [note,setNote] = useState(null)
  
  useEffect (() => {
    
    getNote()
   // eslint-disable-next-line
  },[id])
  
  let getNote = async() => {
    let response = await fetch(`http://localhost:8000/notes/${id}`)
    let data = await response.json()
    setNote(data)
  }

  let updateNote = async() => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  
  }

  let deleteNote = async() => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE',
      headers : {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(note)
    })
    navigate('/')
  }
  
  let createNote = async() => {
    await fetch(`http://localhost:8000/notes/`, {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  
  }

  let handleSubmit = () => {
    updateNote()
    if(id !== 'new' && !note.body){
      deleteNote()
    }else if(id !== 'new') {
      updateNote()
    }else if(id === 'new' && note !== null)
      createNote()
    navigate('/');    
  }


  return (

    <div className='note'>
        <div className='note-header'>
          <h3> 
            <Link to= "/">
              <ArrowLeft onClick={handleSubmit} />
            </Link>

          </h3>
          {id !== 'new'? (
            <button onClick={deleteNote}>Delete</button>
          ) : (
            <button onClick={handleSubmit}>Done</button>
          )}
        </div>
      
        <textarea onChange ={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}>

        </textarea>
    </div>
    
     
    
  )
}

export default NotePage