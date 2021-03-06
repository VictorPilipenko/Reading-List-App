import React from 'react'
import DragItem from '../DragItem/DragItem';
import { BookContext } from '../../../contexts/BookContext';
import './DragContainer.css'
import { ContainerContext } from '../../../contexts/ContainerContext';

const DragContainer = props => {
  const [state, setState] = React.useState(false)
  const [containerName, setContainerName] = React.useState(props.container.name)
  const useBookContext = React.useContext(BookContext)
  const useContainerContext = React.useContext(ContainerContext)

  const handleSubmit = e => {
    e.preventDefault()
    useContainerContext.dispatch({
      type: 'CHANGE_CONTAINER_NAME',
      payload:{
        id: props.container.id,
        item: {
          name: containerName
        }
      }
    })
    setState(false)
  }

  const renderDragItems = () => {
    let items = [];
    useBookContext.books
    .filter(item => item.type === props.container.id)
    .forEach((item, key) => items.push(
      <DragItem
        key={key}
        book={item}
        order={key}
      />
    ))

    return(
      items
    )
  }

  return(
    <div>
      <p 
        className='container-name'
        title='push'
        onClick={() => {
          setState(true)
        }}
      >{props.container.name}</p>
      <div 
        className='drag-container'
        onDrop={event => {
          let dataOrder = JSON.parse(
            event.dataTransfer.getData('drag-item')
          ); 
          let sourceOrder = JSON.parse(
            event.dataTransfer.getData('drag-item-source')
          ); 
          if(event.target.className === 'drag-container'){
            useBookContext.dispatch({
              type: 'ADD_BOOK',
              payload:{
                  title: dataOrder.title,
                  author: dataOrder.author,
                  type: props.container.id,
                  createDate: dataOrder.createDate,
                }
              })
              useBookContext.dispatch({
                type: 'REMOVE_BOOK', 
                payload: dataOrder.id
              })
          } else {
            useBookContext.dispatch({
              type: 'SWAP_BOOK',
              payload:{
                sourceOrder: sourceOrder,
                targetOrder: event.target.getAttribute('data-id'),

                sourceType: dataOrder.type,
                targetType: event.target.getAttribute('data-type'),
              }
            })
          }
        }}
        onDragOver={event => {

          // console.log(event.screenX)
          // console.log(event.screenY)
          // console.log(event.target.id)

          event.preventDefault();
        }}
      >
        {renderDragItems()}
      </div>
      <button 
        className='container-button'
        onClick={() => useContainerContext.dispatch({
          type: 'REMOVE_CONTAINER', 
          payload: props.container.id
        })}
      >delete</button>
      <div>
        {
          state &&
            <div className='item-change'>
              <form onSubmit={handleSubmit}>
                <button 
                  type='button'
                  className='close-button'
                  onClick={()=> {
                    setState(false)
                    setContainerName(props.container.name)
                  }}
                >close</button>
                 <div className='item-fields'>
                  <label>container name:</label>
                  <input 
                    type='text' 
                    // required 
                    onChange={e => setContainerName(e.target.value)} 
                    value={containerName}
                    placeholder='name'
                  />
                </div>
                <input type='submit' value='change name' />
              </form>
            </div>
        }
      </div>
    </div>
  )
}

export default DragContainer