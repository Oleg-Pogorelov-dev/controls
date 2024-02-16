import { makeAutoObservable } from 'mobx';

class TextState {
  textValue: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setTextValue = (text: string) => {
    this.textValue = text;
  };
}

export const textState = new TextState();
