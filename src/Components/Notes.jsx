import React, { useState } from "react";

function Notes({FullNotes = [], requestDelete, editNote}){
    const [removingIds, setRemovingIds] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingData, setEditingData] = useState({title: '', content: ''});

    function handleDelete(note){
        const ok = window.confirm('Delete this note?');
        if (!ok) return;
        setRemovingIds(prev => [...prev, note.id]);
        setTimeout(() => {
            setRemovingIds(prev => prev.filter(i => i !== note.id));
            requestDelete(note);
        }, 300);
    }

    function startEdit(note){
        setEditingId(note.id);
        setEditingData({title: note.title, content: note.content});
    }

    function saveEdit(id){
        editNote(id, editingData);
        setEditingId(null);
        setEditingData({title: '', content: ''});
    }

    function cancelEdit(){
        setEditingId(null);
        setEditingData({title: '', content: ''});
    }

    return (
        <div className="All">
            {(FullNotes || []).map((note) => {
                const isRemoving = removingIds.includes(note.id);
                return (
                    <div className={`Notecontainer ${isRemoving ? 'removing' : ''}`} key={note.id}>
                        <div className="noteHeader">
                            <div style={{display:'flex', gap:8}}>
                                <button className="action" onClick={() => handleDelete(note)}>Delete</button>
                            </div>
                            <div style={{display:'flex', gap:8}}>
                                {editingId === note.id ? (
                                    <>
                                        <button className="action" onClick={() => saveEdit(note.id)}>Save</button>
                                        <button className="action" onClick={cancelEdit}>Cancel</button>
                                    </>
                                ) : (
                                    <button className="action" onClick={() => startEdit(note)}>Edit</button>
                                )}
                            </div>
                        </div>

                        {editingId === note.id ? (
                            <div>
                                <input className="title" value={editingData.title} onChange={(e)=>setEditingData(d=>({...d,title:e.target.value}))} />
                                <textarea className="content" value={editingData.content} onChange={(e)=>setEditingData(d=>({...d,content:e.target.value}))} />
                            </div>
                        ) : (
                            <>
                                <div className="tt">{note.title}</div>
                                <div className="cc">{note.content}</div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Notes