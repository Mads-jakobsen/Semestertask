 import styles from '../App.module.css'

 import { useState, useEffect } from "react";
 import ProductList from '../components/ProductList/ProductList';
 import FilterPanel from '../components/FilterPanel/Filterpanel';
 import { getFavoritesFromStorage, saveFavoritesToStorage } from "../utils/localStorage";

 import { useNavigate } from 'react-router-dom'
 import Pagination from '../components/Pagination/Pagination'
 import DiscountCode from '../components/Checkout/Discount';





 export default function ProductsPage({  addToCart, removeFromCart, cart }){
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


      const [searchTerm, setSearchTerm] = useState("")
     const [selectedCategory, setSelectedCategory] = useState("")
     const [sortOption, setSortOption] = useState("")
     const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

    //Favoritter med localstorage


  const [favoriteIds, setFavoriteIds] = useState(getFavoritesFromStorage)



  // pagination
   const [currentPage, setCurrentPage] = useState(1)
     const itemsPerPage = 10;


  useEffect(() => {
         const fetchProducts = async () => {
             setLoading(true)
             setError(null)

             try {
                 const res = await fetch('https://dummyjson.com/products?limit=100')
                 if (!res.ok) throw new Error('Noget gik galt med hentningen')
                
                 const data = await res.json()
                 setProducts(data.products)
             } catch (err) {
                 setError(err.message)
             } finally {
                 setLoading(false)
             }
         }
         fetchProducts()
     }, [])


     
   useEffect(() => {
         saveFavoritesToStorage(favoriteIds)
     }, [favoriteIds])


     const categories = [...new Set(products.map((p) => p.category))]

      function resetFilters() {
         setSearchTerm("")
         setSelectedCategory("")
         setSortOption("")
         setShowOnlyFavorites(false)
         setCurrentPage(1)
     } 

    
   function toggleFavorite(id) {
         setFavoriteIds((favIds) =>
        favIds.includes(id) ? favIds.filter((fid) => fid !== id) : [...favIds, id]
        )
     }


     const filteredProducts=products
     .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
      .filter((p) => (showOnlyFavorites ? favoriteIds.includes(p.id) : true ))
      .sort((a,b) => {

       switch(sortOption){


           case "priceAsc":
                 return a.price - b.price;
             case "priceDesc":
                 return b.price - a.price;
             case "alphaAsc":
                 return a.title.localeCompare(b.title);
                case "alphaDesc":
                 return b.title.localeCompare(a.title);
                 case "ratingAsc":
                  return a.rating -(b.rating)
                 case "ratingDesc":
                  return b.rating - (a.rating)
             default:
                 return 0;
        
        
       }
       })
       const totalPages= Math.ceil(filteredProducts.length/itemsPerPage)
        const pagedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)


         useEffect(() => {
         if (currentPage > totalPages) {
             setCurrentPage(1)
        }
     },[filteredProducts, currentPage, totalPages])

     return(
      
       <div className={styles.app}>

         <section>

        
          <h1>Produkter</h1>
           <FilterPanel
                 searchTerm={searchTerm}
                 setSearchTerm={setSearchTerm}
                 selectedCategory={selectedCategory}
                 setSelectedCategory={setSelectedCategory}
                 categories={categories}
                 sortOption={sortOption}
                 setSortOption={setSortOption}
                 showOnlyFavorites={showOnlyFavorites}
                 setShowOnlyFavorites={setShowOnlyFavorites}
                 resetFilters={resetFilters}
             />

             {loading && <p>Loader produkter...</p>}
             {error && <p className={styles.error}>Fejl: {error}</p>}</section>


   


             {!loading && !error && (
   <>
     <ProductList
       products={pagedProducts}
       favoriteIds={favoriteIds}
       toggleFavorite={toggleFavorite}
       addToCart={addToCart}  
     />

     <Pagination
       currentPage={currentPage}
       totalPages={totalPages}
       setCurrentPage={setCurrentPage}
     />
   </>
 )}


       </div>
     )



 }
