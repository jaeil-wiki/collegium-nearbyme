import {createClient} from "redis";

const redisClient = createClient({
  url: `redis://localhost:6379/0`,
});

redisClient.connect()

export const getMockAdvertisements = async (location) => {
  return redisClient.keys(`room:${location}:*`);
}

export const setMockAdvertisement = async (location, accountId) => {
  await redisClient.set(`room:${location}:${accountId}`, 1);
  await redisClient.expire(`room:${location}:${accountId}`, 5)
}

export const getMockAttendees = async () => {
  return redisClient.keys(`attendees:collegium:*`);
}

export const setMockAttendee = async (accountId) => {
  await redisClient.set(`attendees:collegium:${accountId}`, 1, 'NX', 1);
}
