import { useState, useEffect, useCallback } from "react"
import { Row, Col, Form, InputGroup } from "react-bootstrap"
import { Search } from "lucide-react"

const NavBar = ({ onSearchChange, onSortChange }) => {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, onSearchChange])

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleSortChange = useCallback(
    (e) => {
      onSortChange(e.target.value)
    },
    [onSortChange],
  )

  return (
    <Row className="mb-4">
      <Col md={8}>
        <InputGroup>
          <InputGroup.Text>
            <Search size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search for bags..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Col>
      <Col md={4}>
        <Form.Select onChange={handleSortChange} style={{ backgroundColor: "#fff8f0" }}>
          <option value="">Sort by</option>
          <option value="name-asc">Name A→Z</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
        </Form.Select>
      </Col>
    </Row>
  )
}

export default NavBar
