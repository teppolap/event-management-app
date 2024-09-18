import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import bgImage from './assets/bg-image.png'; // Import the background image
import { motion } from 'framer-motion';

const App = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events from the server
        axios.get('http://localhost:5000/api/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleEventAdd = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const handleEventDelete = (id) => {
        axios.delete(`http://localhost:5000/api/events/${id}`)
            .then(() => setEvents(events.filter(event => event._id !== id)))
            .catch(error => console.error(error));
    };

    const handleToggleReminder = (eventId) => {
        const selectedEvent = events.find(event => event._id === eventId);
        const updatedEvent = { ...selectedEvent, reminder: !selectedEvent.reminder };

        axios.put(`http://localhost:5000/api/events/${eventId}`, updatedEvent)
            .then(() => {
                const updatedEvents = events.map(event =>
                    event._id === eventId ? updatedEvent : event
                );
                setEvents(updatedEvents);
            })
            .catch(error => console.error(`Error updating reminder status for event with ID ${eventId}:`, error));
    };

    const onEventEdit = (eventId, updatedData) => {
        axios.put(`http://localhost:5000/api/events/${eventId}`, updatedData)
            .then(() => {
                const updatedEvents = events.map(event =>
                    event._id === eventId ? { ...event, ...updatedData } : event
                );
                setEvents(updatedEvents);
            })
            .catch(error => console.error(`Error updating event with ID ${eventId}:`, error));
    };

    return (
        <div
            className="min-h-screen text-white p-6 flex flex-col items-center"
            style={{
                backgroundImage: `url(${bgImage}), linear-gradient(to bottom right, rgba(17, 24, 39, 0.6), rgba(31, 41, 55, 0.6))`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundBlendMode: 'overlay',
                backgroundAttachment: 'fixed',
            }}
        >
            <motion.div
                className="w-full max-w-6xl flex flex-col md:flex-row gap-8 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-full md:w-1/2 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg relative overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-20"></div>
                    <h2 className="text-4xl font-extrabold mb-4 text-white relative z-10">
                        Event Manager
                        <motion.div
                            className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                    </h2>
                    <p className="text-lg text-gray-300 relative z-10">
                        Welcome to Event Manager, your go-to app for keeping track of all your important events. 
                        Use the form on the right to add new events and set reminders. Below, you can view and manage 
                        all your events in one place. Keep your schedule organized and never miss an important date!
                    </p>
                </motion.div>
                <motion.div
                    className="w-full md:w-1/2 flex items-center justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <EventForm onEventAdd={handleEventAdd} />
                </motion.div>
            </motion.div>
            <EventList
                events={events}
                onEventDelete={handleEventDelete}
                onToggleReminder={handleToggleReminder}
                onEventEdit={onEventEdit}
            />
        </div>
    );
};

export default App;
