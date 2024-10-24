import { useSelector } from 'react-redux';

const Notification = () => {
  const value = useSelector((state) => state);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (value.notification === null) {
    return null;
  } else return <div style={style}>{value.notification}</div>;
};

export default Notification;
