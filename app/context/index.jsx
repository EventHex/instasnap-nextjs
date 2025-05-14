// EventContext.js
'use client'

import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
export const EventContext = createContext();

// Create a provider component
export const EventProvider = ({ children }) => {
  // Define state with initial value (null for no event selected)
  const [event, setEventId] = useState(null);
  const [iswhatsupauth, setIswhatsupauth] = useState(false);
  const [registredUser, setRegistredUser] = useState(null);
  const [cachedImages, setCachedImages] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Initialize from sessionStorage on mount
  useEffect(() => {
    const storedEvent = sessionStorage.getItem('eventId');
    const storedRegistredUser = sessionStorage.getItem('registredUser');
    const storedImages = sessionStorage.getItem('cachedImages');
    const storedFetchTime = sessionStorage.getItem('lastFetchTime');
    
    if (storedEvent) {
      setEventId(storedEvent);
    }
    if (storedRegistredUser) {
      setRegistredUser(storedRegistredUser);
    }
    if (storedImages) {
      setCachedImages(JSON.parse(storedImages));
    }
    if (storedFetchTime) {
      setLastFetchTime(parseInt(storedFetchTime));
    }
  }, []);

  // Create the value object to be provided
  const contextValue = {
    event,
    setEventId,
    iswhatsupauth,
    setIswhatsupauth,
    registredUser,
    setRegistredUser,
    cachedImages,
    setCachedImages,
    lastFetchTime,
    setLastFetchTime,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook for easy context use
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
