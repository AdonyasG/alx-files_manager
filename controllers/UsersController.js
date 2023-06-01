import dbClient from '../utils/db';

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
