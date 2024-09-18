import React from 'react';
import EventItem from './EventItem';

const EventList = ({ events, onEventDelete, onToggleReminder, onEventEdit }) => {
    return (
        <div className="w-full max-w-4xl mx-auto mt-6 space-y-4 opacity-90">
            {events.map(event => (
                <EventItem
                    key={event._id}
                    event={event}
                    onToggleReminder={onToggleReminder}
                    onEventDelete={onEventDelete}
                    onEventEdit={onEventEdit}
                />
            ))}
        </div>
    );
};

export default EventList;
