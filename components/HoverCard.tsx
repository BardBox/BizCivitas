import Image from 'next/image';
import React from 'react';

// Define the interface for each item
interface CardItem {
  title: string;
  description: string;
  imageUrl: string;
}

// Define the props interface for the HoverCards----

interface HoverCardsProps {
  item1: CardItem;
  item2: CardItem;
  item3: CardItem;
}

const HoverCards: React.FC<HoverCardsProps> = ({ item1, item2, item3 }) => {
  return (
    <div className="hover-cards-section">
      <div className="container">
        <div className="inner-wrap">
          <div className="card card-1">
            <div className="card-image" style={{ backgroundImage: `url(${item1.imageUrl})` }}></div>
            <h3>{item1.title}</h3>
            <p>{item1.description}</p>
          </div>

          <div className="card card-2">
            <div className="card-image" style={{ backgroundImage: `url(${item2.imageUrl})` }}></div>
            <h3>{item2.title}</h3>
            <p>{item2.description}</p>
          </div>

          <div className="card card-3">
            <div className="card-image" style={{ backgroundImage: `url(${item3.imageUrl})` }}></div>
            <h3>{item3.title}</h3>
            <p>{item3.description}</p>
          </div>

          <div className="background-div">
            <Image src="https://i.ibb.co/XrfQgW33/Elements.png" alt="Decorative elements background" />
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hover-cards-section {
          background: #FEF5E8;
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
        }

        .container {
          position: relative;
          display: flex;
          gap: 100px;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .inner-wrap {
          max-width: 1440px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 100px;
        }

        .card {
          background: white;
          border: 2px solid #ddd;
          border-radius: 12px;
          padding: 40px 20px;
          flex: 1;
          min-height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
          height: 455px;
          text-align: center;
          max-width: 300px;
        }

        .card:hover {
          background: #29365F;
          color: white;
          border-color: #29365f;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 123, 255, 0.3);
        }

        .card:hover h3 {
          color: white;
        }

        .card-image {
          width: 221px;
          height: 221px;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          margin-bottom: 20px;
          border: 4px solid #f0f0f0;
        }

        .card:hover .card-image {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .card p {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.8;
          text-align: center !important;
        }

        .card:hover p {
          opacity: 1;
        }

        .background-div {
          position: absolute;
          top: -10px;
          left: calc(33.33% + 10px / 3 - 10px);
          width: calc(33.33% - 20px / 3);
          height: calc(100% + 20px);
          border-radius: 16px;
          z-index: 1;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.8;
        }

        .background-div img {
          scale: 1.3;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card:nth-child(1):hover ~ .background-div {
          left: -5px;
          transform: scale(1.05);
        }

        .card:nth-child(2):hover ~ .background-div {
          left: calc(33.33% + 30px / 3 - 10px);
          transform: scale(1.05);
        }

        .card:nth-child(3):hover ~ .background-div {
          left: calc(66.66% + 60px / 3 - 10px);
          transform: scale(1.05);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            gap: 15px;
          }

          .inner-wrap {
            flex-direction: column;
            gap: 15px;
          }

          .card {
            padding: 30px 20px;
            max-width: 100%;
          }

          .background-div {
            top: calc(33.33% + 15px / 3 - 10px);
            left: -10px;
            width: calc(100% + 20px);
            height: calc(33.33% - 15px / 3);
          }

          .background-div img {
            scale: 0.8;
          }

          .card:nth-child(1):hover ~ .background-div {
            top: -10px;
            left: -10px;
            transform: scale(1.02);
          }

          .card:nth-child(2):hover ~ .background-div {
            top: calc(33.33% + 15px / 3 - 10px);
            left: -10px;
            transform: scale(1.02);
          }

          .card:nth-child(3):hover ~ .background-div {
            top: calc(66.66% + 30px / 3 - 10px);
            left: -10px;
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
};

export default HoverCards;