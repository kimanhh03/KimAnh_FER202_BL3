import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { allGenres } from '../data/movies'

export default function MovieRequestForm() {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!title) newErrors.title = 'Title is required'
    if (!genre) newErrors.genre = 'Genre is required'
    if (!year || year <= 1900) newErrors.year = 'Year must be > 1900'
    if (!duration || duration <= 0) newErrors.duration = 'Duration must be > 0'
    if (!description || description.length < 30) newErrors.description = 'Description must be at least 30 characters'
    return newErrors
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
    } else {
      setErrors({})
      setSubmitted(true)
      setTitle('')
      setGenre('')
      setYear('')
      setDuration('')
      setDescription('')
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      {submitted && <Alert variant="success">Request submitted. Thank you!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} isInvalid={!!errors.title} onChange={e => setTitle(e.target.value)} />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Select value={genre} isInvalid={!!errors.genre} onChange={e => setGenre(e.target.value)}>
            <option value="">Select genre</option>
            {allGenres.filter(g => g !== 'All').map(g => <option key={g} value={g}>{g}</option>)}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" value={year} isInvalid={!!errors.year} onChange={e => setYear(e.target.value)} />
          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control type="number" value={duration} isInvalid={!!errors.duration} onChange={e => setDuration(e.target.value)} />
          <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} isInvalid={!!errors.description} onChange={e => setDescription(e.target.value)} />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </Container>
  )
}
