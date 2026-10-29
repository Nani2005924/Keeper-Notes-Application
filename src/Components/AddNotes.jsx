import React,{useState} from "react";

function AddNotes({FullNotes,setFullNotes}){
    const [title,settitle] = useState('');
    const [content,setcontent] = useState('');

    function btn(e){
        e.preventDefault();
        const t = title.trim();
        const c = content.trim();
        if (!t || !c) {
            window.alert('Title and content should be filled');
            return;
        }
        if (t.length > 25) {
            window.alert('Title must be 25 characters or fewer');
            return;
        }
        // unique title check
        if ((FullNotes || []).some(n => n.title === t)){
            window.alert('Title must be unique');
            return;
        }
        const newNote = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2,9)}`,
            title: t,
            content: c
        };
        setFullNotes([...(FullNotes || []), newNote]);
        settitle('');
        setcontent('');
    }

    return(
        <form className="container" onSubmit={btn}>
            <h2>Add Notes</h2>
            <input className="title" value={title} maxLength={25} placeholder="Title (Max 25 Characters)" onChange={(e)=>{settitle(e.target.value.slice(0, 25))}} />
            <textarea className="content" value={content} placeholder="Details" onChange={(e)=>{setcontent(e.target.value)}} />
            <button className="add" >Add</button>
        </form>
    )
}

export default AddNotes;