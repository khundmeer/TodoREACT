import { useState } from 'react'

import { useAddNewToDoMutation } from '../../Store/API_Service/TODO_API'
import { useDispatch } from 'react-redux'
import { addNewItem } from '../../Store/sliceLists'
import { newItemModal } from '../../Store/sliceModals'

import { Container, Box, Body, Buttons } from './styles'
import { FaArrowLeft, FaPlus } from 'react-icons/fa'

export const NewItemModal = () => {
  const [addNewToDo] = useAddNewToDoMutation();
  const buttons = ['todo', 'doing', 'done']
  const [value, setValue] = useState('')
  const [toDo, settoDo] = useState({ title: "", description: "" })

  const dispatch = useDispatch()

  const closeNewItemModal = () => {
    dispatch(newItemModal())
  }

  const handleNewItem = (e: any) => {
    settoDo({ ...toDo, [e.target.name]: e.target.value })
  }

  const addNewItemFunction = (index: number) => {
    if (toDo.title != "" && toDo.description != "") {
      let todo_status = ""
      if (index == 0) {
        todo_status = "todo"
      } else if (index == 1) {
        todo_status = "doing"
      } else {
        todo_status = "done"
      }
      const addObject = {
        id: {
          "timestamp": 0,
        }, title: toDo.title, description: toDo.description, status: todo_status, list_index: index
      };

      const result = addNewToDo(addObject)

      // console.log("Add Items", value)
      // console.log("Add Items", index)
      // dispatch(addNewItem({ value, index }))
      closeNewItemModal()
      settoDo({ title: "", description: "" })
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      addNewItemFunction(0)
    }
  }

  return (
    <Container>
      <Box>
        <header>
          <button onClick={closeNewItemModal}>
            <FaArrowLeft size={20} />
          </button>
          <h1>add a new item</h1>
          <FaPlus size={20} />
        </header>
        <Body className='mt-10 mb-6 px-4'>
          <input placeholder='Plese enter title' onKeyDown={handleKeyDown} name="title" autoFocus type="text" value={toDo.title} onChange={handleNewItem} />
          <div style={{ padding: "10px" }}></div>
          <input placeholder='Plese enter description' onKeyDown={handleKeyDown} name="description" autoFocus type="text" value={toDo.description} onChange={handleNewItem} />

          {/* <input  type="textarea" /> */}
        </Body>
        <Buttons>
          {
            buttons.map((button, index) =>
              <button key={index} onClick={() => addNewItemFunction(index)}>
                {button}
              </button>
            )
          }
        </Buttons>
        <footer />
      </Box>
    </Container>
  )
}