import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getProfile from '@wasp/queries/getProfile';
import createProfile from '@wasp/actions/createProfile';

export function Profile() {
  const { profileId } = useParams();
  const { data: profile, isLoading, error } = useQuery(getProfile, { profileId });
  const createProfileFn = useAction(createProfile);
  const [location, setLocation] = useState(profile.location);
  const [interests, setInterests] = useState(profile.interests);
  const [radiusOfDiscovery, setRadiusOfDiscovery] = useState(profile.radiusOfDiscovery);
  const [description, setDescription] = useState(profile.description);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateProfile = () => {
    createProfileFn({
      location,
      interests,
      radiusOfDiscovery,
      description
    });
  };

  return (
    <div className=''>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Location'
          className='px-1 py-2 border rounded text-lg'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type='text'
          placeholder='Interests'
          className='px-1 py-2 border rounded text-lg'
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        <input
          type='number'
          placeholder='Radius of Discovery'
          className='px-1 py-2 border rounded text-lg'
          value={radiusOfDiscovery}
          onChange={(e) => setRadiusOfDiscovery(Number(e.target.value))}
        />
        <input
          type='text'
          placeholder='Description'
          className='px-1 py-2 border rounded text-lg'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleUpdateProfile}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Update Profile
        </button>
      </div>
      <div>
        <p>Location: {profile.location}</p>
        <p>Interests: {profile.interests}</p>
        <p>Radius of Discovery: {profile.radiusOfDiscovery}</p>
        <p>Description: {profile.description}</p>
      </div>
    </div>
  );
}