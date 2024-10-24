import { useSelector, useDispatch } from 'react-redux';
import {
  createAnecdote,
  voteAnecdote,
  setAnecdotes,
  appendAnecdote,
} from './reducers/anecdoteReducer.js';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { hideNotification, showNotification } from './reducers/notificationReducer';
import { useEffect } from 'react';
import anecdoteServices from './services/anecdotes.js';

const App = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL') {
      return anecdotes;
    } else {
      return anecdotes.filter((note) =>
        note.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
  });

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
  };

  const create = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';

    const anecdoteToDb = await anecdoteServices.postAnecdote(anecdote);

    dispatch(appendAnecdote(anecdoteToDb));
    dispatch(showNotification(anecdoteToDb.content));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  useEffect(() => {
    anecdoteServices.getAllAnecdotes().then((response) => {
      dispatch(setAnecdotes(response));
    });
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm handleSubmit={create} />
    </div>
  );
};

export default App;
