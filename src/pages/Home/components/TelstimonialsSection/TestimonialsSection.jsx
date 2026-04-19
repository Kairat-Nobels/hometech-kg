import React from 'react';
import { useSelector } from 'react-redux';
import { FiStar } from 'react-icons/fi';
import './testimonialsSection.scss';

const TestimonialsSection = () => {
  const { reviews = [] } = useSelector((state) => state.reviewsReducer);

  const visibleReviews = Array.isArray(reviews) ? reviews.slice(0, 6) : [];

  return (
    <section className="testimonials-section">
      <div className="page-container">
        <div className="testimonials-head">
          <span className="section-label">Отзывы</span>
          <h2>Что говорят наши покупатели</h2>
          <p>
            Мнения клиентов о качестве товаров, обслуживании и удобстве покупки.
          </p>
        </div>

        <div className="testimonials-grid">
          {visibleReviews.length > 0 ? (
            visibleReviews.map((item) => (
              <div className="testimonial-card" key={item.id}>
                <div className="testimonial-stars">
                  <FiStar />
                  <FiStar />
                  <FiStar />
                  <FiStar />
                  <FiStar />
                </div>

                <p className="testimonial-comment">
                  {item.comment}
                </p>

                <div className="testimonial-user">
                  <div className="testimonial-avatar">
                    {item.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h4>{item.name}</h4>
                    <span>Покупатель HOME TECH KG</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="testimonials-empty">
              Пока отзывов нет
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
