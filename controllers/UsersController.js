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

exports.postNew = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ error: 'Missing email' });
  }
  if (!password) {
    return res.status(400).send({ error: 'Missing password' });
  }
  try {
    const user = await dbClient.createUser({ email, password });
    res.status(201).send({ id: user.id, email: user.email });
  } catch (err) {
    res.status(400).send({ error: 'Already exist' });
  }
  return true;
};
