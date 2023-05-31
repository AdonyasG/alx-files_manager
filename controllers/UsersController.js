import redisClient from '../utils/redis';
import dbClient from '../utils/db';

exports.getStatus = async (req, res) => {
  if (redisClient.isAlive()) {
    res.status(200).send({ redis: true, db: true });
  } else {
    res.status(200).send({ redis: false, db: true });
  }
};

exports.getStats = async (req, res) => {
  res.status(200).send({ users: await dbClient.nbUsers(), files: await dbClient.nbFiles() });
};
