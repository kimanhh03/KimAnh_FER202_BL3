import React from 'react';

const FeaturedCarousel = ({ recipes, onViewRecipe, onAddToFavourite }) => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <h3 className="fw-bold text-center mb-4">Featured Recipes</h3>
          <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {recipes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#featuredCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            <div className="carousel-inner">
              {recipes.map((recipe, index) => (
                <div key={recipe.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="card border-0 shadow-lg">
                        <div className="row g-0">
                          <div className="col-md-6">
                            <img
                              src={recipe.image || "/placeholder.svg"}
                              className="img-fluid rounded-start h-100"
                              alt={recipe.name}
                              style={{ minHeight: "300px", objectFit: "cover" }}
                            />
                          </div>
                          <div className="col-md-6">
                            <div className="card-body h-100 d-flex flex-column justify-content-center">
                              <h4
                                className="card-title fw-bold"
                                style={{ color: "#198754" }} // màu xanh lá nút btn-success
                              >
                                {recipe.name}
                              </h4>
                              <p className="card-text text-muted mb-3">{recipe.description}</p>

                              <div className="mb-3">
                                <small className="text-muted d-block">
                                  ⏱️ Prep: {recipe.prepTime}min | Cook: {recipe.cookTime}min
                                </small>
                                <small className="text-muted">
                                  📊 Difficulty: {recipe.difficulty}
                                </small>
                              </div>

                              <div className="d-flex gap-2">
                                <button className="btn btn-success flex-fill" onClick={() => onViewRecipe(recipe)}>
                                  View Recipe
                                </button>
                                <button className="btn btn-outline-danger" onClick={() => onAddToFavourite(recipe)}>
                                  ♡
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#featuredCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#featuredCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
