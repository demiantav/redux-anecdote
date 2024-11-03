import axios from 'axios';

const apiUrl = 'http://localhost:3001/anecdotes';

const getAllAnecdotes = async () => {
  try {
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const postAnecdote = async (content) => {
  const anecdoteToDb = { content, votes: 0 };
  try {
    const response = await axios.post(apiUrl, anecdoteToDb);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const update = async (id, votes) => {
  const contentUpdated = await axios.put(`${apiUrl}/${id}`, votes);

  return contentUpdated.data;
};

export default { getAllAnecdotes, postAnecdote, update };
