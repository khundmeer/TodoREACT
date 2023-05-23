import { useEffect, useState } from 'react'
import { Container, Box, Body, Buttons } from './styles'
import { FaArrowLeft, FaRegEdit } from 'react-icons/fa'

import { useDispatch } from 'react-redux'
import { editItem, edit } from '../../Store/sliceLists'
import { editModal } from '../../Store/sliceModals'
import { useGetTODObyIDQuery, useUpdateTodoMutation } from '../../Store/API_Service/TODO_API'

interface _id {
  timestamp: number
}
interface IList {
  id: _id, title: string, description: string, list_index: number
}
export const EditModal = () => {

  const { data, error, isLoading, isSuccess } = useGetTODObyIDQuery(edit.id);

  const [value, setValue] = useState("")
  const [todoData, SetToDoData] = useState<IList>({ id: { timestamp: 0 }, title: "", description: "", list_index: 0 })
  const dispatch = useDispatch()
  const [updateTodo] = useUpdateTodoMutation();

  const handleItemValue = (e: any) => {

    SetToDoData({ ...todoData, [e.target.name]: e.target.value })
    // setValue(todoData.title)
  }

  useEffect(() => {
    if (data) {
      //setValue(data.title)
      SetToDoData({ id: data.id, title: data.title, description: data.description, list_index: data.list_index });
    }

  }, [data]);
  const closeEditModal = () => {
    // console.log(value)
    dispatch(editModal(todoData.title))
  }

  const handleEditItem = () => {
    console.log("todoData.title", todoData)
    if (todoData.title) {

      const addObject = {
        _id: todoData.id, title: todoData.title, description: todoData.description, status: "", list_index: todoData.list_index
      };

      updateTodo(addObject)

      dispatch(editItem(todoData.title))
      closeEditModal()
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleEditItem()
    }
  }

  return (
    <Container>
      <Box>
        <header>
          <button onClick={closeEditModal}>
            <FaArrowLeft size={20} />
          </button>
          <h1>edit item</h1>
          <FaRegEdit size={24} />
        </header>
        <Body className='mt-10 mb-6 px-4'>
          <input onKeyDown={handleKeyDown} autoFocus name="title" type="text" value={todoData.title} onChange={handleItemValue} />
        </Body>
        <Body className='mt-10 mb-6 px-4'>
          <input onKeyDown={handleKeyDown} name="description" type="text" value={todoData.description} onChange={handleItemValue} />
        </Body>
        <Buttons>
          <button onClick={handleEditItem}>
            Save
          </button>
        </Buttons>
        <footer />
      </Box>
    </Container>
  )
}