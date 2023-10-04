import HttpError from '@wasp/core/HttpError.js'

export const createProfile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Profile.create({
    data: {
      location: args.location,
      interests: args.interests,
      radiusOfDiscovery: args.radiusOfDiscovery,
      description: args.description,
      userId: context.user.id
    }
  });
}

export const createEvent = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newEvent = await context.entities.Event.create({
    data: {
      title: args.title,
      description: args.description,
      location: args.location,
      time: args.time,
      creator: { connect: { id: context.user.id } },
      participant: { connect: { id: context.user.id } }
    }
  });

  return newEvent;
}

export const joinEvent = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const event = await context.entities.Event.findUnique({
    where: { id: args.eventId }
  });
  if (!event) { throw new HttpError(404, 'Event not found') };

  const participant = await context.entities.Participant.findUnique({
    where: { eventId_userId: { eventId: args.eventId, userId: context.user.id } }
  });
  if (participant) { throw new HttpError(409, 'User is already a participant') };

  return context.entities.Participant.create({
    data: {
      user: { connect: { id: context.user.id } },
      event: { connect: { id: args.eventId } }
    }
  });
}

export const createMessage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newMessage = await context.entities.Message.create({
    data: {
      content: args.content,
      time: args.time,
      sender: { connect: { id: context.user.id } }
    }
  });

  return newMessage;
}