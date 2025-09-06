import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setSearchLoading } from "store/slices/carSlice";

function useDebounce(value, delay) {
  const dispatch = useDispatch();
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      dispatch(setSearchLoading(false));
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
