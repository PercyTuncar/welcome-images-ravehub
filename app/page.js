"use client"
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/random-image')
      .then(response => response.json())
      .then(data => {
        if (data.url) {
          setImageUrl(data.url);
        } else {
          setError('No image URL returned');
        }
      })
      .catch(err => {
        setError('Failed to fetch image URL');
        console.error('Error fetching image URL:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Random Image</h1>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <img src={imageUrl} alt="Random" />}
    </div>
  );
}
