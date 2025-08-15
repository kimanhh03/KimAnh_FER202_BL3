import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Heart, Eye } from 'lucide-react'

export default function MovieCard({ movie, onAddToFavourites, onViewDetails, isFavourite }) {
  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={movie.poster}
        alt={movie.title}
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.description.length > 60
            ? movie.description.slice(0, 60) + '...'
            : movie.description}
        </Card.Text>
        <div>{movie.year} | {movie.country} | {movie.duration} min</div>
        
        <div className="my-2" style={{ textAlign: 'left' }}>
          <Badge bg="info" style={{ fontSize: '0.8rem', padding: '5px 8px' }}>
            {movie.genre}
          </Badge>
        </div>

        <div className="mt-auto d-flex justify-content-between">
          <Button
            onClick={() => onAddToFavourites(movie.id)}
            style={{
              border: '1px solid red',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              ...(isFavourite
                ? { backgroundColor: 'red', color: 'white' }
                : { backgroundColor: 'white', color: 'red' })
            }}
          >
            <Heart
              size={16}
              fill={isFavourite ? 'white' : 'none'}
              color={isFavourite ? 'white' : 'red'}
            />
            {isFavourite ? 'Remove' : 'Add to Favourites'}
          </Button>

          <Button
            variant="secondary"
            onClick={() => onViewDetails(movie)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Eye size={16} />
            Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    poster: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    duration: PropTypes.number,
    country: PropTypes.string
  }).isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired
}
