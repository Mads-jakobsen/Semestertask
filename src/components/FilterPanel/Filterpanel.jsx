import styles from './FilterPanel.module.css'


export default function FilterPanel({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    sortOption,
    setSortOption,
    showOnlyFavorites,
    setShowOnlyFavorites,
    resetFilters,
}) 

{
  return(

<section className={styles.FilterPanel}>
  
  <input type="text" placeholder="Søg produkter..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.input} />



 <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={styles.select}>
            <option value="">Alle kategorier</option>
  {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}

        </select>

 <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className={styles.select}>
            <option value="">Sorter efter</option>
            <option value="priceAsc">Pris (Lav til høj)</option>
            <option value="priceDesc">Pris (Høj til lav)</option>
            <option value="alphaAsc">Navn (A-Z)</option>
            <option value="alphaDesc">Navn (Z-A)</option>
            <option value="ratingAsc">Rating (Lav til høj)</option>
            <option value="ratingDesc">Rating (Høj til Lav)</option>
        </select>

        
        

        <button onClick={resetFilters} className={styles.resetButton}>
          Nulstil
        </button>




</section>
)

}