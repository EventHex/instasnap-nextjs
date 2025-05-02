// EventContext.js
'use client'

import React, { createContext, useState, useContext } from "react";

// Create the context
export const EventContext = createContext();

// Create a provider component
export const EventProvider = ({ children }) => {
  // Define state with initial value (null for no event selected)
  const [eventId, setEventId] = useState(null);

  // Create the value object to be provided
  const contextValue = {
    eventId,
    setEventId,
  };

  // Return the provider with the value
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
