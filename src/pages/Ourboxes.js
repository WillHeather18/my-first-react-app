import React, { useState } from 'react';
import AppBar from '../Components/AppBar';
import "../styles/Ourboxes.css"
import scifiBox from '../assets/scifi-box.png';
import fantasyBox from '../assets/fantasy-box.png';
import crimeBox from '../assets/crime-box.png';
import childrensBox from '../assets/childrens-box.png'
import Modal from '../Components/Modal';
import cartIcon from '../assets/cart.svg';

function OurBoxes() {
  const boxes = [
    { title: 'Children\'s', description: 'For the lovers of bedtime stories', detailedDescription: 'The Children\'s Box is a magical journey through enchanting worlds, tailored to spark young imaginations with a curated selection of whimsical stories and adventurous tales.',image: childrensBox, examples: ['https://books.google.com/books/content?id=XP1EDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api','http://books.google.com/books/content?id=ZK7xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'http://books.google.com/books/content?id=M-CocWLBGB4C&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'http://books.google.com/books/content?id=WwN4BgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'http://books.google.com/books/content?id=234wEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api']},
    { title: 'Sci-Fi', description: 'For the lovers of space and time travel', detailedDescription: 'The Sci-Fi Box transports readers to distant galaxies and futuristic landscapes, featuring a handpicked collection of thrilling science fiction tales that ignite the imagination.',image: scifiBox, examples: ['https://books.google.com/books/content?id=I12oPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api','https://books.google.com/books/content?id=DmUr6q1EDYMC&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'https://books.google.com/books/content?id=IDFfMPW32hQC&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'https://books.google.com/books/content?id=Ojqi8KbWuLwC&printsec=frontcover&img=1&zoom=1&source=gbs_api', 'https://books.google.com/books/content?id=PEpoEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'] },
    { title: 'Fantasy', description: 'For the lovers of magic and adventure', detailedDescription: 'The Fantasy Box weaves a spell of mystical tales and epic adventures, bringing together a handpicked selection of fantasy stories to captivate the imagination.',image: fantasyBox, examples: ['http://books.google.com/books/content?id=bI7dwAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api','http://books.google.com/books/content?id=5NomkK4EV68C&printsec=frontcover&img=1&zoom=1&source=gbs_api','http://books.google.com/books/content?id=xYotngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api','http://books.google.com/books/content?id=ZiYU9NS4QkYC&printsec=frontcover&img=1&zoom=1&source=gbs_api','http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&source=gbs_api'] },
    { title: 'Crime', description: 'For the lovers of mystery and suspense', detailedDescription: 'The Crime Box delves into the dark and gripping world of mystery and suspense, offering a selection of critically acclaimed crime novels that promise to keep readers on the edge of their seats.',image: crimeBox, examples: ['http://books.google.com/books/content?id=qYcJVplnx5cC&printsec=frontcover&img=1&zoom=5&source=gbs_api','http://books.google.com/books/content?id=hxL2qWMAgv8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','http://books.google.com/books/content?id=JuGobGYpH8cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','http://books.google.com/books/content?id=NGJubhmwqfoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','http://books.google.com/books/content?id=ivzfRJGrdFsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api']  }  
  ];

  const [current, setCurrent] = useState(0);
  const [slide, setSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(boxes[0]);

  const nextSlide = () => {
    if (current < boxes.length - 1) {
      setCurrent(current + 1);
      setSelectedBox(boxes[current + 1]);
      setSlide(slide - 120); // Move to the next slide
    }
  };
  
  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelectedBox(boxes[current - 1]);
      setSlide(slide + 120); // Move to the previous slide
    }
  };

  const handleBoxClick = (index) => {
    if (index !== current) {
      setSelectedBox(boxes[index]);
      setCurrent(index);
      setSlide(index * -120);
    }
    else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <AppBar transparent={false} />
      <div className='ourboxes-page'>
        <h1 className='ourboxes-title'>Select Your box!</h1>
        <div className='carousel-container' style={{ transform: `translateX(${slide}%)` }}>
          {boxes.map((box, index) => (
      <div className={`ourboxes-box ${index === current ? 'active' : ''}`} key={index} onClick={() => handleBoxClick(index)}>
        {index === current ? (
          <div onClick={() => handleBoxClick(index)} className='ourboxes-box-modal'>
            <h2>{box.title}</h2>
            <p>{box.description}</p>
            <img src={box.image} alt={`${box.title} box`} />
          </div>
        ) : (
          <>
            <h2>{box.title}</h2>
            <p>{box.description}</p>
            <img src={box.image} alt={`${box.title} box`} />
          </>
        )}
      </div>
    ))}
        </div>
        <div className='ourboxes-arrows'>
          {current > 0 && <button onClick={prevSlide}>&larr;</button>}
          {current < boxes.length - 1 && <button onClick={nextSlide}>&rarr;</button>}
        </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>{selectedBox?.title + " box"}</h2>
          <div className='modal-description'>
            <p>{selectedBox?.detailedDescription}</p>
          </div>
          <p className='popular-books'>{"Popular " + selectedBox?.title + " Books"}</p>
          <div className='modal-books'>
            {selectedBox?.examples?.map((url, index) => {
              return (
                <div className='modal-book' key={index}>
                  <img src={url} alt="Book Cover" className="book-cover"/>
                </div>
              );
            })}
          </div>
          <button className='add-to-cart-button'>
            Add to cart
            <img src={cartIcon} alt="cart icon" />
          </button>
        </Modal>
      )}
    </div>
    </div>
  );
}

export default OurBoxes;
