import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import FreeMovies from './components/FreeMovies'
import FavouriteMovies from './components/FavouriteMovies'
import MovieRequestForm from './components/MovieRequestForm'
import MovieCarousel from './components/MovieCarousel'
import'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [favourites, setFavourites] = useState([])
  const [page, setPage] = useState('free')

  useEffect(() => {
    const saved = localStorage.getItem('favourites')
    if (saved) setFavourites(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>Movie Explorer</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link active={page === 'free'} onClick={() => setPage('free')}>Free Movies</Nav.Link>
            <Nav.Link active={page === 'favourites'} onClick={() => setPage('favourites')}>My Favourite Movies</Nav.Link>
            <Nav.Link active={page === 'request'} onClick={() => setPage('request')}>Movie Request Form</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={{ marginTop: '70px' }}>
        <Container>
          {page === 'free' && (
            <>
              <MovieCarousel />
              <FreeMovies favourites={favourites} setFavourites={setFavourites} />
            </>
          )}
          {page === 'favourites' && <FavouriteMovies favourites={favourites} setFavourites={setFavourites} />}
          {page === 'request' && <MovieRequestForm />}
        </Container>
      </div>
    </>
  )
}
