import { useDispatch } from 'react-redux';
import { filterAnecdote } from '../reducers/filterReducer';

const style = {
  marginBottom: 10,
};

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div style={style}>
      filter <input onChange={(event) => dispatch(filterAnecdote(event.target.value))} />
    </div>
  );
};

export default Filter;
