export function genre_join(genres) {
  let result = '';
  for (let i = 0; i < genres.length; i++) {
    result += genres[i].name;
    if (i < genres.length - 1)
      result += '/';
  }
  return result;
}