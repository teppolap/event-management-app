import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const EventForm = ({ onEventAdd }) => {
    const [newEvent, setNewEvent] = useState({ title: '', date: '', reminder: false });

    const handleInputChange = (e) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/events', newEvent)
            .then(response => {
                onEventAdd(response.data);
                setNewEvent({ title: '', date: '', reminder: false });
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="flex justify-center items-center p-6">
            <motion.div
                className="w-full max-w-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.form
                    onSubmit={handleSubmit}
                    className="w-full p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.h2
                        className="text-2xl font-bold mb-6 text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Add New Event
                    </motion.h2>
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <label className="block text-lg font-medium text-gray-300 mb-2">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 bg-gray-800 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                        />
                    </motion.div>
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <label className="block text-lg font-medium text-gray-300 mb-2">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 bg-gray-800 text-white border border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                        />
                    </motion.div>
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <button
                            type="submit"
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white"
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Add
                            </span>
                        </button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default EventForm;
