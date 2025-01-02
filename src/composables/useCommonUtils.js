/**
 * Returns white or black text color based on the brightness of the background color
 * @param {String} bgColor - Hex code of the background color
 * @returns {String} - '#FFFFFF' or '#000000'
 */
const getContrastingTextColor = (bgColor) => {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? '#000000' : '#FFFFFF'; 
};

export function useCommonUtils() {
  return {
    getContrastingTextColor,
  };
}