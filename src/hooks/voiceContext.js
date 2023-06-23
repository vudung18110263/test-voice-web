import React from 'react';

export const CoiveContext = React.createContext();

// import {ReactNode, Dispatch, SetStateAction, createContext, useContext, useState} from 'react';

// const AtomicContext = createContext();

// export const AtomicContextProvider = ({children: ReactNode}) => {
//   const [state, setState] = useState<T | undefined>(undefined);

//   const getState = () => {
//     if (once) {
//       queueMicrotask(() => setState(undefined));
//     };
//     return state;
//   };

//   return (
//     <AtomicContext.Provider value={[getState, setState]}>
//       {children}
//     </AtomicContext.Provider>
//   );
// };

// export const useAtomicContext = () => {
//   const context = useContext(AtomicContext);
//   if (!context) {
//     throw new Error('useAtomicContext must be used in AtomicContextProvider');
//   }
//   return context;
// };