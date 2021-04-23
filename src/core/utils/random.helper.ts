export const randomString = (type = 'default', length = 8): string => {
  const map = {
    string: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  };
  let _result = '';
  for (let i = 0; i < length; i++) {
    _result += map[type].charAt(Math.floor(Math.random() * map[type].length));
  }
  return _result;
};
