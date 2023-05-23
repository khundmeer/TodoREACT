import { Container } from './styles'

import { List } from '../List';

import { DragDropContext } from 'react-beautiful-dnd';

import { useSelector, useDispatch } from 'react-redux'
import { Lists, moveCard, state } from '../../Store/sliceLists';
import { useEffect, useState } from 'react';
import { useDragAndDropTodoMutation, useGetAllTODOQuery } from '../../Store/API_Service/TODO_API';
import { alterData } from './alter_data';
import { useUpdateTodoMutation } from '../../Store/API_Service/TODO_API';

export const Board = () => {
  const { lists } = useSelector(state)
  const [updateTodo] = useUpdateTodoMutation();
  const [dragAndDropTodo] = useDragAndDropTodoMutation();
  const { data, error, isLoading, isSuccess } = useGetAllTODOQuery()

  const [listdetaails, setListDetails] = useState<Lists[]>([])
  // console.log("ToDOList Data", data)

  const dispatch = useDispatch()

  const handleDropEnd = (result: any) => {
    const { destination, source, draggableId } = result
    console.log(result)
    console.log("source: ", source)
    console.log("destination:", destination)
    // console.log(destination)


    if (destination) {

      var status = ["todo", "doing", "done"]

      if (destination.index) {

      }
      const addObject = {
        _id: draggableId, title: "", description: "", status: status[destination.droppableId], list_index: destination.droppableId
      };


      dragAndDropTodo({ updateRequest: addObject, source: source, designation: destination })

      dispatch(moveCard({
        fromList: Number(source.droppableId),
        toList: Number(destination.droppableId),
        fromIndex: source.index,
        toIndex: destination.index
      }))
    }
  }

  useEffect(() => {

    if (data)

      setListDetails(alterData(data).lists);

  }, [data])

  useEffect(() => {
    if (lists[0].items.length > 0) {
      document.title = `(${lists[0].items.length}) To do list`;
    } else {
      document.title = `To do list`;
    }
  })

  return (
    <Container>
      <DragDropContext onDragEnd={handleDropEnd} >
        {
          listdetaails.map((data, index) =>
            <List key={index} data={data} listIndex={index} />
          )
        }
      </DragDropContext>
    </Container>
  )
}