'use client';

import { useState, useEffect } from 'react';
import { formatNumber, parseNumber } from './numberFormatFilter';

export function useFormattedNumberInput(initialValue?: number) {
  const [rawValue, setRawValue] = useState<number | undefined>(initialValue);
  const [displayValue, setDisplayValue] = useState<string>(
    initialValue !== undefined ? formatNumber(initialValue) : '',
  );

  // Sync when external filter changes
  useEffect(() => {
    setRawValue(initialValue);
    setDisplayValue(
      initialValue !== undefined ? formatNumber(initialValue) : '',
    );
  }, [initialValue]);

  const handleChange = (input: string) => {
    setDisplayValue(input);
    setRawValue(parseNumber(input));
  };

  const handleBlur = () => {
    setDisplayValue(formatNumber(rawValue));
  };

  const reset = () => {
    setRawValue(undefined);
    setDisplayValue('');
  };

  return {
    rawValue,
    displayValue,
    handleChange,
    handleBlur,
    reset,
  };
}
