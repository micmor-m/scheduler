import { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  //push the new mode in history mode
  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode)
      setHistory([...history, newMode])
    } else {
      setMode(newMode)
    }
  }

  //pop the last mode from history mode
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