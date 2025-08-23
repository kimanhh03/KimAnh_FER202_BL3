import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Carousel from '../components/Carousel';
import { ArrowRight, Star, Clock, Truck } from 'lucide-react';

const Home = () => {
  const { bgClass } = useTheme();

  const features = [
    {
      icon: <Star size={40} className="text-warning" />,
      title: "Premium Quality",
      description: "Authentic recipes with the finest ingredients"
    },
    {
      icon: <Clock size={40} className="text-success" />,
      title: "Fast Service",
      description: "Quick preparation without compromising quality"
    },
    {
      icon: <Truck size={40} className="text-danger" />, 
      title: "Home Delivery",
      description: "Fresh meals delivered to your doorstep"
    }
  ];

  return (
    <div className={`min-vh-100 ${bgClass}`}>
      {/* Hero Section with Carousel */}
      <section>
        <Carousel autoPlay={true} interval={4000} />
      </section>

      <Container>
        {/* Welcome Section */}
        <section className="py-5">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                Welcome to Food Paradise
              </h1>
              <p className="lead mb-4">
                Discover the rich flavors of authentic Indian cuisine, crafted with love and 
                served with passion. From traditional recipes to modern innovations, we bring 
                you the best culinary experience.
              </p>
              <Button 
                as={Link} 
                to="/products" 
                variant="success" 
                size="lg"
                className="px-4 py-2"
              >
                Explore Our Menu
                <ArrowRight size={20} className="ms-2" />
              </Button>
            </Col>
          </Row>
        </section>

        {/* Features Section */}
        <section className="py-5">
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="display-5 fw-bold mb-3">Why Choose Us?</h2>
              <p className="lead text-muted">
                We're committed to providing you with exceptional dining experience
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={4} key={index}>
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      {feature.icon}
                    </div>
                    <Card.Title className="h4 mb-3">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Call to Action */}
        <section className="py-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="bg-success text-white">
                <Card.Body className="text-center p-5">
                  <h3 className="display-6 fw-bold mb-3">
                    Ready to Order?
                  </h3>
                  <p className="lead mb-4">
                    Browse our delicious menu and place your order today!
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Button 
                      as={Link} 
                      to="/products" 
                      variant="light" 
                      size="lg"
                      className="px-4"
                    >
                      View Menu
                    </Button>
                    <Button 
                      as={Link} 
                      to="/register" 
                      variant="outline-light" 
                      size="lg"
                      className="px-4"
                    >
                      Sign Up Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Home;
