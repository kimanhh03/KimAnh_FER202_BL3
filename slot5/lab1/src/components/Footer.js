import React from 'react';

const Footer = () => {
  const handleSocialClick = (platform) => {
    console.log(`Navigate to ${platform}`);
  };

  return (
    <footer className="bg-light py-4 mt-5 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-3">
              <h5 className="text-success fw-bold mb-0 me-3">Healthy Recipe Finder</h5>
              <span className="badge bg-success">v1.0</span>
            </div>
            <p className="text-muted mb-2" style={{fontSize: '0.9rem'}}>
              Discover delicious, healthy recipes that fit your lifestyle. 
              Made with ❤️ and passion for good food.
            </p>
          </div>
          
          <div className="col-md-6">
            <div className="text-md-end">
              <p className="mb-2 fw-bold text-dark" style={{fontSize: '0.9rem'}}>
                Follow us on social media:
              </p>
              <div className="d-flex justify-content-md-end justify-content-start gap-3">
                <button 
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                  onClick={() => handleSocialClick('Instagram')}
                >
                  📷 Instagram
                </button>
                <button 
                  className="btn btn-outline-info btn-sm d-flex align-items-center gap-2"
                  onClick={() => handleSocialClick('Twitter')}
                >
                  🐦 Twitter
                </button>
                <button 
                  className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2"
                  onClick={() => handleSocialClick('TikTok')}
                >
                  🎵 TikTok
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="my-4"/>
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <small className="text-muted">
              © 2024 Healthy Recipe Finder. All rights reserved.
            </small>
          </div>
          <div className="col-md-6 text-md-end">
            <small className="text-muted">
              Built with React & Bootstrap | 
              <a href="#" className="text-decoration-none ms-1">Privacy Policy</a> |
              <a href="#" className="text-decoration-none ms-1">Terms of Service</a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;