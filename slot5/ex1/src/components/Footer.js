import React from 'react';

const Footer = () => {
  const handleSocialClick = (platform) => {
    console.log(`Navigate to ${platform}`);
  };

  return (
    <footer className="bg-light py-3 mt-4">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <p className="mb-1" style={{fontSize: '0.9rem'}}>
              Made with love and passion
            </p>
            <div className="mt-1">
              <button 
                className="btn btn-link text-decoration-none me-2 p-0 border-0"
                style={{fontSize: '0.8rem'}}
                onClick={() => handleSocialClick('Instagram')}
              >
                Instagram
              </button>
              <button 
                className="btn btn-link text-decoration-none me-2 p-0 border-0"
                style={{fontSize: '0.8rem'}}
                onClick={() => handleSocialClick('Twitter')}
              >
                Twitter
              </button>
              <button 
                className="btn btn-link text-decoration-none p-0 border-0"
                style={{fontSize: '0.8rem'}}
                onClick={() => handleSocialClick('TikTok')}
              >
                TikTok
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;