import HttpError from '@wasp/core/HttpError.js'

export const getProfile = async ({ profileId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const profile = await context.entities.Profile.findUnique({
    where: { id: profileId },
    include: { User: true }
  });

  if (!profile) { throw new HttpError(400) }
  if (profile.User.id !== context.user.id) { throw new HttpError(400) }

  return profile;
}

export const getEvent = async ({ eventId }, context) => {
  const event = await context.entities.Event.findUnique({
    where: { id: eventId }
  });

  if (!event) throw new HttpError(400);

  return event;
}

export const getMessages = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Message.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getNearbyEvents = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { profile: true }
  });

  const events = await context.entities.Event.findMany({
    where: {
      location: user.profile.location,
      radiusOfDiscovery: { gte: user.profile.radiusOfDiscovery }
    }
  });

  return events;
}