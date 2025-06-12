const FAVORITES_KEY = "favoriteProductsIds"

export function getFavoritesFromStorage() {
    try {
        const favs = localStorage.getItem(FAVORITES_KEY)
        return favs ? JSON.parse(favs) : []
    } catch (e){
      console.error('kunne ikke', e)
      return []
    }

}

export function saveFavoritesToStorage(favorites) {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch (e) {
        console.error('Kunne ikke gemme favoritter til localStorage', e)
    }
}