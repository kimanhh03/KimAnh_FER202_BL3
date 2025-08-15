import React from 'react'
import { Container, Row, Col, Alert, Modal } from 'react-bootstrap'
import { movies } from '../data/movies'
import MovieCard from '../components/MovieCard'

export default function FavouriteMovies({ favourites, setFavourites }) {
  const [selectedMovie, setSelectedMovie] = React.useState(null)
  const favMovies = movies.filter(m => favourites.includes(m.id))

  const handleFavourites = id => {
    setFavourites(favourites.filter(f => f !== id))
  }

  return (
    <Container className="mt-4">
      {favMovies.length === 0 && <Alert variant="info">No favourites yet.</Alert>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {favMovies.map(m => (
          <Col key={m.id}>
            <MovieCard movie={m} onAddToFavourites={handleFavourites} onViewDetails={setSelectedMovie} isFavourite />
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
    </Container>
  )
}
