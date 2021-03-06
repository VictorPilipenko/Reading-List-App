import React from 'react'
import { BookContext } from '../contexts/BookContext'
import BookDetails from './BookDetails'
import './BookList.css'

const BookList = () => {

  const { books } = React.useContext(BookContext) 

  return books.length ? (
    <div className='book-list'>
      {books.map((book, key) => {
        return (
          <BookDetails key={key} book={book} />
        )
      })}
    </div>
  ) : (
    <>
      no books
    </>
  )
}

export default BookList