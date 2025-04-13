import React, { useState } from 'react';

const PostRequestComponent: React.FC = () => {
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handlePostRequest = async () => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 'Sample data' }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
      } else {
        setResponseMessage(`Error: ${response.status}`);
      }
    } catch (error) {
      setResponseMessage('An error occurred while making the request.');
    }
  };

  return (
    <div>
      <button onClick={handlePostRequest}>Make POST Request</button>
      <p>Response: {responseMessage}</p>
    </div>
  );
};

export default PostRequestComponent;