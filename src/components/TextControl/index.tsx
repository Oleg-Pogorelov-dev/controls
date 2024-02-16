import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { textState } from '../../store/text';

import styles from './style.module.css';

interface TextControlProps {
  rightButtons?: { text: string; onClick: () => void }[];
  leftButtons?: { text: string; onClick: () => void }[];
}

const TextControl: FC<TextControlProps> = observer(
  ({ rightButtons, leftButtons }) => {
    const { textValue, setTextValue } = textState;

    return (
      <div className={styles.text_control_wrapper}>
        <div>
          {leftButtons?.map((obj: { text: string; onClick: () => void }) => (
            <button onClick={obj.onClick}>{obj.text}</button>
          ))}
          <textarea
            onChange={(e) => setTextValue(e.target.value)}
            style={{ resize: 'none' }}
            rows={10}
            cols={45}
            name='text'
            value={textValue}
          />
          {rightButtons?.map((obj: { text: string; onClick: () => void }) => (
            <button onClick={obj.onClick}>{obj.text}</button>
          ))}
        </div>
      </div>
    );
  }
);

export default TextControl;
