import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => void;

const useInput = <T>(initialData: T): [T, ChangeEventHandler, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  return [value, handler, setValue];
};

export default useInput;
