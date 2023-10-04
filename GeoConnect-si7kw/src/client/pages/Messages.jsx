import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getMessages from '@wasp/queries/getMessages';
import createMessage from '@wasp/actions/createMessage';

export function Messages() {
  const { data: messages, isLoading, error } = useQuery(getMessages);
  const createMessageFn = useAction(createMessage);
  const [newMessageContent, setNewMessageContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateMessage = () => {
    createMessageFn({ content: newMessageContent });
    setNewMessageContent('');
  };

  return (
    <div className=''>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Message'
          className='px-1 py-2 border rounded text-lg'
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
        />
        <button
          onClick={handleCreateMessage}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Send Message
        </button>
      </div>
      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <div>
        <Link to='/profile/1'>Go to Profile</Link>
      </div>
    </div>
  );
}