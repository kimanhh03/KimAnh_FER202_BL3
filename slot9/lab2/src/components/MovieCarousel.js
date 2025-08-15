import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function MovieCarousel() {
  return (
    <div style={{ width: '100%', marginBottom: '20px' }}>
      <Carousel style={{ maxHeight: '400px', overflow: 'hidden' }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/movie1.jpg"
            alt="First slide"
            style={{ objectFit: 'cover', height: '400px' }}
          />
          <Carousel.Caption>
            <h5>Galactic Wars</h5>
            <p>Epic space battles.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/movie5.jpg"
            alt="Second slide"
            style={{ objectFit: 'cover', height: '400px' }}
          />
          <Carousel.Caption>
            <h5>City of Love</h5>
            <p>Romance in the city.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/movie7.jpg"
            alt="Third slide"
            style={{ objectFit: 'cover', height: '400px' }}
          />
          <Carousel.Caption>
            <h5>Street Runner</h5>
            <p>Fast-paced action.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}
