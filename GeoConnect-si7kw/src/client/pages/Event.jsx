import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getEvent from '@wasp/queries/getEvent';
import joinEvent from '@wasp/actions/joinEvent';

export function Event() {
  const { eventId } = useParams();
  const { data: event, isLoading, error } = useQuery(getEvent, { eventId });
  const joinEventFn = useAction(joinEvent);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleJoinEvent = () => {
    joinEventFn({ eventId });
  };

  return (
    <div className='p-4'>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{event.time}</p>

      <button
        onClick={handleJoinEvent}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Join Event
      </button>
    </div>
  );
}