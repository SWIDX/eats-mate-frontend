import { createContext } from 'react';

export const SearchContext = createContext({
    info: [],
    value: '',
    text: '',
});
