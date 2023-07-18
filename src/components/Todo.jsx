import React from 'react'
import './todo.css'
import { useState, useRef, useEffect } from 'react'


// react-icons 
import { IoMdDoneAll} from "react-icons/io"
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";


function todo() {


  // using state

  //  taking data from input filed
  const[input,setInput] = useState('');

  // store data from input tag
  const[store,setStore] = useState([]);

  const[editId,setEditId] = useState(0)


  // preventing refresh of form tag.
  const handleSubmit = (e)=>{
    e.preventDefault();
}

 // USE REF
const inputRef = useRef('null')

 // USE EFFECT
 useEffect(()=>{
  inputRef.current.focus()
 })



  // functions

  // button function

  const addTodo = () =>{
    if(input !== ''){
      setStore([...store,{list : input, id : Date.now(), status : false}])
    console.log(store)
    setInput('')
    }

    if(editId){
      const editTodo = store.find((storedData)=> storedData.id === editId)
      const updateTodo = store.map((storedData)=> storedData === editTodo 
      ? (storedData = {id : storedData.id , list : input})
      : (storedData = {id : storedData.id , list : storedData.list}))

      setStore( updateTodo)
      setEditId(0)
      setInput('')
    }
  }

  // complete icon function
  const onComplete = (id)=>{
    let complete = store.map((storedData)=>{
      if(storedData.id === id){
        return ({...storedData, status: !storedData.status})
      }

      return storedData
    })

    setStore(complete)
  }

  // delete icon function
  const onDelete = (id)=>{
    setStore(store.filter((storedData)=> storedData.id !== id))
  }

  // Edit icon function

  const onEdit = (id)=>{
    const editTodo = store.find((storedData)=> storedData.id === id)
    setInput(editTodo.list)
    setEditId(editTodo.id)
  }

  




  return (
    <div className='container'>
        <h2>Modern Todo</h2>
        <form className='form-group' onSubmit={handleSubmit}>
            <input type="text" value={input} placeholder='Enter Your Task' ref={inputRef} className='form-control input' onChange={(event)=>setInput(event.target.value)}/> 
            <button onClick={addTodo} className='btn'>{editId ? 'Edit' : 'Add'}</button>
        </form>

        <div className="list">
            <ul>
              {
                store.map((inputDatas)=>{
                  return <li className='list-items'>
                    <div className='list-item-list' id={inputDatas.status ? 'mark-text' : ''}>{inputDatas.list}</div>

                    <span>
                      <IoMdDoneAll className="list-item-icons" id='complete' title='complete' onClick={()=> onComplete(inputDatas.id)}/>
                      <FiEdit className="list-item-icons" id='edit' title='Edit' onClick={()=> onEdit(inputDatas.id)}/>
                      <MdDelete className="list-item-icons" id='delete' title='Delete' onClick={()=> onDelete(inputDatas.id)}/>
                    </span>

                  </li>
                })
              }
            </ul>
        </div>
    </div>
  )
}

export default todo