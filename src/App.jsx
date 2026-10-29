import React,{useState} from "react"
import AddNotes from "./Components/AddNotes"
import Display from "./Components/Display"
import Notes from "./Components/Notes"
import './App.css'

function App() {
  const [FullNotes,setFullNotes] = useState([]);

  // called by Notes after exit animation
  function requestDelete(note){
    setFullNotes(prev => (prev || []).filter(n => n.id !== note.id));
  }

  function editNote(id, data){
    setFullNotes(prev => (prev || []).map(n => n.id === id ? {...n, ...data} : n));
  }

  return(
    <div className="cont">
      <AddNotes FullNotes={FullNotes} setFullNotes={setFullNotes} />

      <div className="display">
        <Display />
        <Notes FullNotes={FullNotes} requestDelete={requestDelete} editNote={editNote} />
      </div>

    </div>
  )
}

export default App
