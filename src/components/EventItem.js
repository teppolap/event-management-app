import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';

const EventItem = ({ event, onEventDelete, onToggleReminder, onEventEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(event.title);
    const [editedDate, setEditedDate] = useState(moment.utc(event.date).format("YYYY-MM-DD"));

    useEffect(() => {
        if (event) {
            const today = new Date();
            const eventDate = new Date(event.date);

            today.setHours(0, 0, 0, 0);
            eventDate.setHours(0, 0, 0, 0);

            if (today.getTime() === eventDate.getTime() && event.reminder) {
                alert(`Today is the day of the event: ${event.title}`);
            }
        }
    }, [event, event.reminder]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEventEdit(event._id, {
            title: editedTitle,
            date: editedDate
        });
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedTitle(event.title);
        setEditedDate(moment.utc(event.date).format("YYYY-MM-DD"));
        setIsEditing(false);
    };

    return (
        <motion.div
            className="rounded-lg bg-gradient-to-br from-blue-700 to-teal-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-4 bg-gray-800 bg-opacity-90 rounded-lg border border-gray-400 border-opacity-50 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <p className={`text-sm ${event.reminder ? 'text-green-400' : 'text-gray-400'}`}>
                    {event.reminder ? "Reminder On" : ""}
                </p>
                <div className="mt-2">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="border border-gray-400 border-opacity-70 rounded p-2 mb-2 w-full bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            />
                            <input
                                type="date"
                                value={editedDate}
                                onChange={(e) => setEditedDate(e.target.value)}
                                className="border border-gray-400 border-opacity-70 rounded p-2 mb-2 w-full bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            />
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                            <hr className="my-2 border-gray-600" />
                            <span className="text-gray-300 flex items-center">
                                <span className="font-semibold pl-3">Event On:</span> 
                                <span className="pl-2">{moment.utc(event.date).format('LL')}</span>
                            </span>
                        </>
                    )}
                </div>
                <div className="mt-4 flex gap-2 justify-left">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSaveClick}
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600"
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Save
                                </span>
                            </button>
                            <button
                                onClick={handleCancelClick}
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600"
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Cancel
                                </span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => onToggleReminder(event._id)}
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600"
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    {event.reminder ? 'Disable Reminder' : 'Enable Reminder'}
                                </span>
                            </button>
                            <button
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600"
                                onClick={() => onEventDelete(event._id)}
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Delete
                                </span>
                            </button>
                            <button
                                onClick={handleEditClick}
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600"
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Edit
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default EventItem;
