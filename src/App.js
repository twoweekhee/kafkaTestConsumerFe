import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const NotificationBox = styled.div`
  background-color: #e6ffe6;
  border: 2px solid #4CAF50;
  border-radius: 10px;
  padding: 20px;
  width: 400px; /* 너비 고정 */
  height: 300px; /* 높이 고정 */
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 내용이 넘치면 스크롤 생성 */
`;

const NotificationMessage = styled.div`
  font-size: 18px;
  color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none; /* 마지막 메시지에는 경계선 제거 */
  }
`;

const NotificationSystem = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8070/api/sse/connect');

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <Container>
      <h1>알림창</h1>
      <NotificationBox>
        {messages.map((message, index) => (
          <NotificationMessage key={index}>{message}</NotificationMessage>
        ))}
      </NotificationBox>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotificationSystem />} />
      </Routes>
    </Router>
  );
};

export default App;
