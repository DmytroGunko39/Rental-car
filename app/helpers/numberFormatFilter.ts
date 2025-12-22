//Format a number with thousand separators only onBlur
export const formatNumber = (num: number | undefined): string => {
  return num !== undefined && num !== null ? num.toLocaleString('en-US') : '';
};

//Parse a formatted number string back to a number
export const parseNumber = (str: string): number | undefined => {
  const cleaned = str.replace(/\D/g, '');
  return cleaned ? Number(cleaned) : undefined;
};
