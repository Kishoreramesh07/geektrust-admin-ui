import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'

export const Pagination = ({usersPerPage, totalUsers, currentPage, setCurrentPage, deleteSelectedUser}) => {
  const pageNumbers = [];

  //Iterate number of pages
  for(let i=1; i <= Math.ceil(totalUsers/usersPerPage); i++){
    pageNumbers.push(i);
  }

  //Paginate Function
  const paginate = (number) => setCurrentPage(number);

  //Prev page 
  const prevPage = () => setCurrentPage((prevState) => prevState-1);

  //Next page 
  const nextPage = () => setCurrentPage((prevState) => prevState+1);

  //jumpToFirstPage
  const jumpToFirstPage = () => setCurrentPage(1);

  //jumpToLastPage
  const jumpToLastPage = () => setCurrentPage(pageNumbers.length);

  return (
    <div className='footer-controls'>
        <div>
            <button className="delete-user"onClick={deleteSelectedUser}>Delete Selected</button>
        </div>
        <nav>
        <ul className="pagination-ul">
            <li className="page-number">
                <button onClick={jumpToFirstPage} className='page-number-link' disabled={ currentPage === 1 ? true : false }>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </button>
            </li>
            <li className="page-number">
                <button onClick={prevPage} className='page-number-link' disabled={ currentPage === 1 ? true : false }>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </li>
            {pageNumbers.map(number => (
                <li key={number} className="page-number">
                    <button onClick={() => paginate(number)} className={currentPage === number ? "page-number-link page-number-link-active" : "page-number-link"}>{number}</button>
                </li>
            ))}
            <li className="page-number">
                <button onClick={nextPage} className='page-number-link' disabled={ currentPage === pageNumbers.length ? true : false }>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </li>
            <li className="page-number">
                <button onClick={jumpToLastPage} className='page-number-link' disabled={ currentPage === pageNumbers.length ? true : false }>
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </button>
            </li>
        </ul>
    </nav>
    </div>
  )
}
