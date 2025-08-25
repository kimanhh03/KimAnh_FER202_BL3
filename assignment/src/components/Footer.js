import { Container, Row, Col } from "react-bootstrap"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-3 mt-4" style={{ borderTop: '2px solid #6c757d' }}>
            <Container>
                <Row>
                    <Col lg={4} md={6} className="mb-3">
                        <h5 className="mb-2 text-warning">Handbag Store</h5>
                        <p className="mb-2 text-secondary" style={{ fontSize: "0.9rem" }}>
                            Vietnam's leading luxury handbag store.
                            We offer high quality products
                            with unique designs and the latest fashion trends.
                        </p>
                    </Col>

                    <Col lg={4} md={6} className="mb-3">
                        <h6 className="mb-2 text-warning">Contact Information</h6>
                        <div className="d-flex align-items-center mb-1 text-secondary">
                            <MapPin size={14} className="me-2 text-warning" />
                            <span>123 ABC, District 1, DN</span>
                        </div>
                        <div className="d-flex align-items-center mb-1 text-secondary">
                            <Phone size={14} className="me-2 text-warning" />
                            <span>0123 456 789</span>
                        </div>
                        <div className="d-flex align-items-center mb-1 text-secondary">
                            <Mail size={14} className="me-2 text-warning" />
                            <span>contact@handbagstore.vn</span>
                        </div>
                    </Col>

                    <Col lg={4} md={12} className="mb-3">
                        <h6 className="mb-2 text-warning">Opening Hours</h6>
                        <div className="d-flex align-items-center mb-1 text-secondary">
                            <Clock size={14} className="me-2 text-warning" />
                            <div style={{ fontSize: "0.9rem" }}>
                                <div>Mon - Fri: 8:00 - 21:00</div>
                                <div>Sat - Sun: 9:00 - 22:00</div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h6 className="mb-1 text-warning">Follow Us</h6>
                            <div className="d-flex" style={{ fontSize: "0.9rem" }}>
                                <a href="#" className="text-secondary text-decoration-none me-2"
                                    style={{ transition: 'color 0.3s ease' }}
                                    onMouseEnter={(e) => e.target.style.color = '#ffc107'}
                                    onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                                    Facebook
                                </a>
                                <span className="text-secondary me-2">|</span>
                                <a href="#" className="text-secondary text-decoration-none me-2"
                                    style={{ transition: 'color 0.3s ease' }}
                                    onMouseEnter={(e) => e.target.style.color = '#ffc107'}
                                    onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                                    Instagram
                                </a>
                                <span className="text-secondary me-2">|</span>
                                <a href="#" className="text-secondary text-decoration-none"
                                    style={{ transition: 'color 0.3s ease' }}
                                    onMouseEnter={(e) => e.target.style.color = '#ffc107'}
                                    onMouseLeave={(e) => e.target.style.color = '#6c757d'}>
                                    Zalo
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>

                <hr className="my-3 border-secondary" />

                <Row>
                    <Col className="text-center">
                        <p className="mb-0 text-secondary" style={{ fontSize: "0.85rem" }}>
                            © 2024 Handbag Store. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
