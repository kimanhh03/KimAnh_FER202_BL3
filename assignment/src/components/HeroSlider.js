import { useState, useEffect } from "react"
import { Carousel } from "react-bootstrap"

const HeroSlider = () => {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    {
      id: 1,
      image: "images/hero1.jpg",
      title: "Luxury Handbag Collection",
      subtitle: "Discover unique and elegant designs",
    },
    {
      id: 2,
      image: "images/hero2.jpg",
      title: "Up To 30% Off",
      subtitle: "Grab your favorite bag at a special price",
    },
    {
      id: 3,
      image: "images/hero3.jpg",
      title: "Latest Arrivals",
      subtitle: "Always keep up with fashion trends",
    },
  ]

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPaused, slides.length])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <div className="hero-slider">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        controls={true}
        indicators={true}
        fade={true}
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div className="slide-wrapper">
              <img
                className="d-block w-100"
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                style={{
                  height: "400px",
                  objectFit: "cover",
                }}
              />
              <div className="overlay"></div>
            </div>

            <Carousel.Caption className="text-center">
              <h2 className="fw-bold text-white mb-3 text-shadow">
                {slide.title}
              </h2>
              <p className="fs-5 text-white text-shadow">{slide.subtitle}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <style jsx>{`
        .hero-slider {
          width: 100%;
          margin: 0;
          padding: 0;
          position: relative;
        }
        .slide-wrapper {
          position: relative;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4)
          );
          z-index: 1;
        }
        .carousel-caption {
          z-index: 2;
        }
        .text-shadow {
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  )
}

export default HeroSlider
