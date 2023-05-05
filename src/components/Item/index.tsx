import { Container, Buttons } from './styles'

import { useDispatch } from 'react-redux'
import { deleteItem } from '../../Store/sliceLists'
import { editModal } from '../../Store/sliceModals'

import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { BsList } from 'react-icons/bs'

import { Draggable, DraggableProvided } from 'react-beautiful-dnd'
import { useDeleteToDoMutation } from '../../Store/API_Service/TODO_API'


interface itemProps {
  index: number
  listIndex: number
  listItem: {
    id: string
    content: string
  }
}

export const Item = ({ index, listIndex, listItem }: itemProps) => {
  const dispatch = useDispatch()
  const [deleteToDo] = useDeleteToDoMutation();
  const handleDeleteItem = (id: string) => {

    const result = deleteToDo(id)
    //dispatch(deleteItem({ listIndex, index }))
  }

  const openEditModal = () => {
    dispatch(editModal({ listIndex, index, value: listItem.content }))
  }

  return (
    <Draggable key={listItem.id} draggableId={listItem.id} index={index} >
      {(provided: DraggableProvided) => (
        <Container
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          style={{ ...provided.draggableProps.style }}
        >
          <BsList size={24} />
          <p>
            {listItem.content}
          </p>
          <Buttons>
            <button onClick={openEditModal}>
              <FaRegEdit size={22} />
            </button>
            <button onClick={() => handleDeleteItem(listItem.id)}>
              <FaRegTrashAlt size={20} />
            </button>
          </Buttons>
        </Container >
      )}
    </Draggable >
  )
}