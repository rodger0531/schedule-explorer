import './App.css';
import Calendar from './calendar/calendar';
import {withTranslation} from 'react-i18next';

function App() {

  return (
    <div className="App w-full px-3">
      <Calendar/>
    </div>
  );
}

export default withTranslation()(App);
