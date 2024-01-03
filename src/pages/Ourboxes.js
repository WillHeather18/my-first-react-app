import React, { useState } from 'react';
import AppBar from '../Components/AppBar';
import "../styles/Ourboxes.css"
import scifiBox from '../assets/scifi-box.png';
import fantasyBox from '../assets/fantasy-box.png';
import crimeBox from '../assets/crime-box.png';

function OurBoxes() {
  const boxes = [
    { title: 'Sci-Fi', description: 'For the lovers of space and time travel', image: scifiBox },
    { title: 'Fantasy', description: 'For the lovers of magic and adventure', image: fantasyBox },
    { title: 'Crime', description: 'For the lovers of mystery and suspense', image: crimeBox },
  ];

  const [current, setCurrent] = useState(0);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    if (current < boxes.length - 1) {
      setCurrent(current + 1);
      setSlide(slide - 100); // Move to the next slide
    }
  };
  
  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSlide(slide + 100); // Move to the previous slide
    }
  };

  return (
    <div>
      <AppBar transparent={false} />
      <div className='ourboxes-page'>
        <h1 className='ourboxes-title'>Our Boxes</h1>
        <div className='carousel-container' style={{ transform: `translateX(${slide}%)` }}>
          {boxes.map((box, index) => (
            <div className={`ourboxes-box ${index === current ? 'active' : ''}`} key={index}>
              <h2>{box.title}</h2>
              <p>{box.description}</p>
              <img src={box.image} alt={`${box.title} box`} />
            </div>
          ))}
        </div>
        <div className='ourboxes-arrows'>
          {current > 0 && <button onClick={prevSlide}>&larr;</button>}
          {current < boxes.length - 1 && <button onClick={nextSlide}>&rarr;</button>}
        </div>
      </div>
    </div>
  );
}

export default OurBoxes;
