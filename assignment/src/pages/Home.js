import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useTheme } from "../contexts/ThemeContext"
import { Star, ShieldCheck, Truck, ShoppingBag } from "lucide-react"

export default function Home() {
  console.log("Home component rendering...")
  
  const { theme } = useTheme()
  console.log("Theme:", theme)

  try {

    return (
      <>
        <section className={`py-5 ${theme === "dark" ? "bg-secondary text-light" : "bg-light text-dark"}`}>
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="mb-4 mb-md-0">
                <h1 className="display-5 fw-bold mb-3">
                  Luxury Handbags for Modern Women
                </h1>
                <p className="lead mb-4">
                  Discover our curated collection of authentic designer handbags, combining elegance, quality, and timeless style.
                </p>
                <LinkContainer to="/products">
                  <Button variant={theme === "dark" ? "outline-light" : "dark"} size="lg">
                    Shop Now
                  </Button>
                </LinkContainer>
              </Col>
              <Col md={6}>
                <div
                  className={`p-3 rounded border ${
                    theme === "dark" ? "border-secondary bg-dark" : "border-light bg-white"
                  }`}
                >
                  <img
                    src="images/home.jpg"
                    alt="Luxury Handbags"
                    className="img-fluid rounded"
                    onError={(e) => {
                      console.log("Image failed to load:", e.target.src)
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-5">
          <Container>
            <Row className="text-center g-4">
              <Col md={3}>
                <Card className={`h-100 shadow-sm border ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
                  <Card.Body>
                    <ShoppingBag size={40} className="mb-3 text-warning" />
                    <Card.Title>Authentic Products</Card.Title>
                    <Card.Text>
                      100% genuine handbags from world-renowned luxury brands
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className={`h-100 shadow-sm border ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
                  <Card.Body>
                    <Truck size={40} className="mb-3 text-warning" />
                    <Card.Title>Free Shipping</Card.Title>
                    <Card.Text>
                      Free nationwide shipping for orders over 1,000,000 VND
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className={`h-100 shadow-sm border ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
                  <Card.Body>
                    <ShieldCheck size={40} className="mb-3 text-warning" />
                    <Card.Title>Quality Guarantee</Card.Title>
                    <Card.Text>
                      12-month warranty with 30-day return policy
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className={`h-100 shadow-sm border ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
                  <Card.Body>
                    <Star size={40} className="mb-3 text-warning" />
                    <Card.Title>5-Star Service</Card.Title>
                    <Card.Text>
                      Professional consultation & 24/7 customer support
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className={`py-5 ${theme === "dark" ? "bg-secondary text-light" : "bg-light text-dark"}`}>
          <Container>
            <h2 className="text-center fw-bold mb-4">Customer Feedback</h2>
            <p className="text-center mb-5">What our happy customers say</p>
            <Row className="g-4">
              <Col md={4}>
                <Card className={`h-100 shadow-sm border ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
                  <Card.Body className="text-center">
                    <div className="mb-2 text-warning">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                    <Card.Text className="fst-italic">
                      "Chất lượng sản phẩm tuyệt vời, giao hàng nhanh chóng. Tôi rất hài lòng!"
                    </Card.Text>
                    <h6 className="mt-3 text-warning">Nguyễn Thị Lan</h6>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={`h-100 shadow-sm border ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
                  <Card.Body className="text-center">
                    <div className="mb-2 text-warning">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                    <Card.Text className="fst-italic">
                      "Túi xách đẹp, chất lượng cao cấp. Nhân viên tư vấn rất nhiệt tình."
                    </Card.Text>
                    <h6 className="mt-3 text-warning">Trần Minh Anh</h6>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={`h-100 shadow-sm border ${theme === "dark" ? "bg-dark text-light border-secondary" : "bg-white text-dark"}`}>
                  <Card.Body className="text-center">
                    <div className="mb-2 text-warning">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" stroke="none" />
                      ))}
                    </div>
                    <Card.Text className="fst-italic">
                      "The handbag I bought is stunning and the quality exceeded my expectations."
                    </Card.Text>
                    <h6 className="mt-3 text-warning">Sophia Johnson</h6>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    )
  } catch (error) {
    console.error("Error in Home component:", error)
    return (
      <Container>
        <Row>
          <Col>
            <h1>Something went wrong</h1>
            <p>Please check the console for more details.</p>
          </Col>
        </Row>
      </Container>
    )
  }
}