import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-light py-4">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <h2 className="fw-bold text-dark mb-2">
                Explore our simple, healthy recipes
              </h2>
              <p className="text-muted mx-auto mb-0" style={{maxWidth: '500px', fontSize: '0.95rem'}}>
                Discover quick, whole-food dishes that fit real-life schedules. Search by name or ingredient below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;