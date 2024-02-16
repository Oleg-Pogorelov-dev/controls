import { makeAutoObservable } from 'mobx';
import { CountryInfo } from '../api/apiService';

class AutocompleteState {
  textValue: string = '';
  countries: CountryInfo[] = [];
  maxValue: number = 3;
  isOpenMaxValue: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTextValue = (text: string) => {
    this.textValue = text;
  };

  setCountries = (countries: CountryInfo[]) => {
    this.countries = countries;
  };

  setMaxValue = (num: number) => {
    this.maxValue = num;
  };

  setIsOpenMaxValue = (val: boolean) => {
    this.isOpenMaxValue = val;
  };
}

export const autocompleteState = new AutocompleteState();
