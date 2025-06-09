import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const carouselItems = [
    {
      id: 1,
      image: "images/navbar3.jpg",
      title: "𝓦𝓮𝓵𝓬𝓸𝓶𝓮!!",
      subtitle: "Discover our delicious lunch options"
    },
    {
      id: 2,
      image: "images/navbar2.jpg",
      title: "𝓣𝓸",
      subtitle: "Fresh meals prepared daily"
    },
    {
      id: 3,
      image: "images/navbar1.jpg",
      title: "𝓛𝓾𝓷𝓬𝓱𝓑𝓸𝔁",
      subtitle: "Order now for quick delivery"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setActiveIndex((prevIndex) => 
          prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [paused, carouselItems.length]);

  const goToIndex = (index) => {
    setActiveIndex(index);
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="carousel-container">
      <div 
        className="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === activeIndex ? 1 : 0,
                transition: { duration: 0.8 }
              }}
            >
              <img 
                src={item.image} 
                alt={`Slide ${index + 1}`} 
                className="carousel-image"
              />
              <div className="carousel-caption">
                <motion.h2
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { delay: 0.3, duration: 0.6 }
                  }}
                  className="carousel-title text-warning"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    transition: { delay: 0.5, duration: 0.6 }
                  }}
                  className="carousel-subtitle text-white"
                >
                  {item.subtitle}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        <button 
          className="carousel-control prev"
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <span className="control-icon">❮</span>
        </button>
        <button 
          className="carousel-control next"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <span className="control-icon">❯</span>
        </button>

        <div className="carousel-indicators">
          {carouselItems.map((item, index) => (
            <button
              key={item.id}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel-container {
          width: 100%;
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .carousel {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 40%; /* Aspect ratio for responsive height */
        }

        .carousel-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .carousel-item {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease;
        }

        .carousel-item.active {
          opacity: 1;
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.7);
        }

        .carousel-caption {
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          width: 80%;
          color: white;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .carousel-title {
          font-size: 4rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .carousel-subtitle {
          font-size: 1.5rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .carousel-control:hover {
          background: rgba(255,255,255,0.4);
          transform: translateY(-50%) scale(1.1);
        }

        .prev {
          left: 20px;
        }

        .next {
          right: 20px;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: white;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .carousel {
            padding-bottom: 60%; /* Taller aspect ratio for mobile */
          }

          .carousel-title {
            font-size: 2.5rem;
          }

          .carousel-subtitle {
            font-size: 1.2rem;
          }

          .carousel-control {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .carousel {
            padding-bottom: 80%;
          }

          .carousel-title {
            font-size: 2rem;
          }

          .carousel-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Carousel;
