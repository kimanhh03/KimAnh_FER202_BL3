import React, { useState, useEffect } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import carouselImages from '../data/carouselImages';

const Carousel = ({ autoPlay = true, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const goToPrevious = () => {
    setActiveIndex(activeIndex === 0 ? carouselImages.length - 1 : activeIndex - 1);
  };

  const goToNext = () => {
    setActiveIndex(activeIndex === carouselImages.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div className="position-relative">
      <BootstrapCarousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        indicators={false}
        controls={false}
        className="mb-4"
      >
        {carouselImages.map((image, index) => (
          <BootstrapCarousel.Item key={image.id}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt}
              style={{ 
                height: '400px', 
                objectFit: 'cover',
                filter: 'brightness(0.7)'
              }}
            />
            <BootstrapCarousel.Caption>
              <h3 className="fw-bold mb-3">{image.caption}</h3>
              <p className="lead">{image.description}</p>
            </BootstrapCarousel.Caption>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>

      <button
        className="position-absolute top-50 start-0 translate-middle-y btn btn-dark btn-sm ms-3"
        style={{ zIndex: 10, opacity: 0.7 }}
        onClick={goToPrevious}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0.7'}
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        className="position-absolute top-50 end-0 translate-middle-y btn btn-dark btn-sm me-3"
        style={{ zIndex: 10, opacity: 0.7 }}
        onClick={goToNext}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0.7'}
      >
        <ChevronRight size={20} />
      </button>

      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
        <div className="d-flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm rounded-circle ${
                index === activeIndex ? 'btn-light' : 'btn-outline-light'
              }`}
              style={{ width: '12px', height: '12px', padding: '0' }}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
