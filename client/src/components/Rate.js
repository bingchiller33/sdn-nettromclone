import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Container } from 'react-bootstrap';

function Star({ selected = false, onClick = () => { } }) {
  return (
    <span onClick={onClick} style={{ cursor: 'pointer', transition: 'transform 0.2s' }} className="star">
      <FontAwesomeIcon icon={selected ? solidStar : regularStar} size="lg" />
    </span>
  );
}

export default function Rate({ sid }) {
  const [rating, setRating] = useState(0);
  const totalStars = 5;

  useEffect(() => {
    async function fetchRating() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:9999/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
  
        const user = await response.json();
        const userId = user._id || undefined;
        
        const response2 = await fetch(`http://localhost:9999/rate?userId=${userId}&storyId=${sid}`);
  
        if (!response2.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const resData = await response2.json();
        setRating(resData.rateNo || 0);  // Ensure you have a default value
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    }
  
    fetchRating();
  }, [sid]);
  

  async function starHandler(e, i) {
    setRating(i + 1)
    const token = localStorage.getItem("token")
    const response = await fetch('http://localhost:9999/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const user = await response.json()
    const userId = user._id || undefined
    const storyId = sid
    console.log(userId, storyId, i + 1)
    async function createRate() {
      const response = await fetch('http://localhost:9999/rate', {
        method: 'POST',
        body: JSON.stringify({
          "rateNo": i + 1,
          userId,
          "rateStoryId": storyId,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resData = await response.json()
      console.log(resData)
    }
    createRate()
  }
  return (
    <Container fluid className='mb-3 ps-0'>
      <div style={{ display: 'inline-block' }}>
        {[...Array(totalStars)].map((_, i) => (
          <Star
            key={i}
            selected={i < rating}
            onClick={(e) => starHandler(e, i)}
          />
        ))}
      </div>
      <div>
        {`Bạn đã đánh giá ${rating} sao.`}
      </div>
    </Container>
  );
}
