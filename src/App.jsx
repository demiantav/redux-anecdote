import { useSelector, useDispatch } from 'react-redux';
import { createNote, voteNote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { hideNotification, showNotification } from './reducers/notificationReducer';

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
    dispatch(voteNote(id));
  };

  const create = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createNote(anecdote));
    dispatch(showNotification(anecdote));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

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
