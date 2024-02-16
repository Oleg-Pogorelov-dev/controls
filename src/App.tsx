import { observer } from 'mobx-react-lite';

import AutocompleteControl from './components/AutocompleteControl';
import TextControl from './components/TextControl';
import { textState } from './store/text';

import './App.css';

const App = observer(() => {
  const { textValue, setTextValue } = textState;
  return (
    <div>
      <TextControl
        rightButtons={[
          { text: 'Clear', onClick: () => setTextValue('') },
          { text: 'Hello world!', onClick: () => setTextValue('Hello world!') },
        ]}
      />
      {/* <TextControl
        rightButtons={[{ text: 'Alert', onClick: () => alert(textValue) }]}
        leftButtons={[
          {
            text: 'isNumber',
            onClick: () => {
              if (!Number.isNaN(+textValue)) {
                alert(textValue);
              }
            },
          },
        ]}
      /> */}
      <hr />
      <AutocompleteControl />
    </div>
  );
});
export default App;
