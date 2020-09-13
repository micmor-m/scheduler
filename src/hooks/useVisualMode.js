import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  //push
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode)
      return setHistory([...history, newMode])
    } else {
      return setMode(newMode)
    }
  }

  //pop
  const back = () => {
    if (history.length > 1) {
      setHistory(history => {
        const backValue = [...history].slice(0, history.length - 1);
        setMode(backValue[backValue.length - 1]);
        return backValue
      });
    }
  };
  return { mode, transition, back }
}