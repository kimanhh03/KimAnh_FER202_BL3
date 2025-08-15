import React from 'react'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function SearchFilterBar({ search, setSearch, genre, setGenre, sort, setSort, genres }) {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control value={search} onChange={e => setSearch(e.target.value)} placeholder="Search movies" />
        </InputGroup>
      </Col>
      <Col md={4}>
        <Form.Select value={genre} onChange={e => setGenre(e.target.value)}>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </Form.Select>
      </Col>
      <Col md={4}>
        <Form.Select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="none">None</option>
          <option value="asc">Duration ↑</option>
          <option value="desc">Duration ↓</option>
        </Form.Select>
      </Col>
    </Row>
  )
}

SearchFilterBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
}
