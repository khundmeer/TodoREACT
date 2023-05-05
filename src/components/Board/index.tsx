import { Container } from './styles'

import { List } from '../List';

import { DragDropContext } from 'react-beautiful-dnd';

import { useSelector, useDispatch } from 'react-redux'
import { Lists, moveCard, state } from '../../Store/sliceLists';
import { useEffect, useState } from 'react';
import { useGetAllTODOQuery } from '../../Store/API_Service/TODO_API';
import { alterData } from './alter_data';

export const Board = () => {
  const { lists } = useSelector(state)

  const { data, error, isLoading, isSuccess } = useGetAllTODOQuery()

  const [listdetaails, setListDetails] = useState<Lists[]>([])
  console.log("ToDOList Data", data)

  const dispatch = useDispatch()

  const handleDropEnd = (result: any) => {
    const { destination, source } = result

    if (destination) {
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
      <DragDropContext onDragEnd={handleDropEnd}>
        {
          listdetaails.map((data, index) =>
            <List key={index} data={data} listIndex={index} />
          )
        }
      </DragDropContext>
    </Container>
  )
}