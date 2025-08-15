import React, { useState, useMemo } from 'react'
import { Container, Row, Col, Modal, Toast, Alert } from 'react-bootstrap'
import { movies, allGenres } from '../data/movies'
import MovieCard from '../components/MovieCard'
import SearchFilterBar from '../components/SearchFilterBar'

export default function FreeMovies({ favourites, setFavourites }) {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [sort, setSort] = useState('none')
  const [showToast, setShowToast] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const filteredMovies = useMemo(() => {
    let data = [...movies]
    if (search) data = data.filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    if (genre !== 'All') data = data.filter(m => m.genre === genre)
    if (sort === 'asc') data.sort((a, b) => a.duration - b.duration)
    if (sort === 'desc') data.sort((a, b) => b.duration - a.duration)
    return data
  }, [search, genre, sort])

  const handleFavourites = id => {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter(f => f !== id))
    } else {
      setFavourites([...favourites, id])
      setShowToast(true)
    }
  }

  return (
    <Container className="mt-4">
      <SearchFilterBar search={search} setSearch={setSearch} genre={genre} setGenre={setGenre} sort={sort} setSort={setSort} genres={allGenres} />
      {filteredMovies.length === 0 && <Alert variant="warning">No movies found</Alert>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredMovies.map(m => (
          <Col key={m.id}>
            <MovieCard movie={m} onAddToFavourites={handleFavourites} onViewDetails={setSelectedMovie} isFavourite={favourites.includes(m.id)} />
          </Col>
        ))}
      </Row>
      <Modal show={!!selectedMovie} onHide={() => setSelectedMovie(null)}>
        {selectedMovie && (
          <>
            <Modal.Header closeButton><Modal.Title>{selectedMovie.title}</Modal.Title></Modal.Header>
            <Modal.Body>
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="img-fluid mb-3" />
              <p>{selectedMovie.description}</p>
              <div>{selectedMovie.year} | {selectedMovie.country} | {selectedMovie.duration} min</div>
              <div>Genre: {selectedMovie.genre}</div>
            </Modal.Body>
          </>
        )}
      </Modal>
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide bg="success" className="position-fixed bottom-0 end-0 m-3 text-white">
        <Toast.Body>Added to favourites!</Toast.Body>
      </Toast>
    </Container>
  )
}
