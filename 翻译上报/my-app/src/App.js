import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
          {t("HelloWorld")}
    </div>
  );
}

export default App;
