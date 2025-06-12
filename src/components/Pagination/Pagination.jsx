import styles from './Pagination.module.css'

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
    const prev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }
    const next = () => {
      
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
      
    }


return(
  <div className={styles.Pagination}>
    <button onClick={prev} disabled={currentPage === 1}>forrige</button>

 <span>
                Side {currentPage} af {totalPages}
            </span>
            <button onClick={next} disabled={currentPage === totalPages}>
                Næste
            </button>



  </div>
 

)

}