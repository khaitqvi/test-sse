import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [connectionTime, setConnectionTime] = useState(null);
  const startTimeRef = useRef(null);
  const connectionEstablishedRef = useRef(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const eventSource = new EventSource('http://localhost:8000/events');

    eventSource.onopen = () => {
      console.log('Connection opened');
    };

    eventSource.onmessage = (event) => {
      if (!connectionEstablishedRef.current) {
        const endTime = Date.now();
        const timeTaken = endTime - startTimeRef.current;
        setConnectionTime(timeTaken);
        connectionEstablishedRef.current = true;
      }
      setCount(parseInt(event.data));
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      setError('Failed to connect to the server. Please try again later.');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Server-Sent Events Counter</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-2xl mb-4">Current count: {count}</p>
          {connectionTime !== null && (
            <p className="text-lg">
              Initial connection time: {connectionTime} ms
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default App;