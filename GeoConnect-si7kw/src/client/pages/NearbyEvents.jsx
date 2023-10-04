import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getNearbyEvents from '@wasp/queries/getNearbyEvents';
import joinEvent from '@wasp/actions/joinEvent';

export function NearbyEvents() {
  const { data: events, isLoading, error } = useQuery(getNearbyEvents);
  const joinEventFn = useAction(joinEvent);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleJoinEvent = (eventId) => {
    joinEventFn({ eventId });
  };

  return (
    <div className='p-4'>
      {events.map((event) => (
        <div
          key={event.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{event.title}</div>
          <div>{event.description}</div>
          <div>
            <button
              onClick={() => handleJoinEvent(event.id)}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Join
            </button>
            <Link
              to={`/event/${event.id}`}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}