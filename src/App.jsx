import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, createAnecdote, makeAVote } from './reducers/anecdoteReducer.js';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import {
  hideNotification,
  setNotification,
  showNotification,
} from './reducers/notificationReducer';
import { useEffect } from 'react';
import { initializeAnecdotes } from './reducers/anecdoteReducer.js';

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

  const vote = (anecdote) => {
    const oneVote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    console.log('vote', anecdote.id);
    dispatch(makeAVote(anecdote.id, oneVote));
  };

  const create = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(createAnecdote(anecdote));
    dispatch(setNotification(anecdote, 5000));
  };

  useEffect(() => {
    dispatch(initializeAnecdotes());
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
