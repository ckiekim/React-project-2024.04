export function changeTel(tel) {
  if (!tel)
    return tel;
  if (tel.length === 9 && tel.charAt(1) === '2')
    return tel.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
  if (tel.length === 10)
    if (tel.charAt(1) === '2')
      return tel.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    else
      return tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  if (tel.length === 12 && tel.charAt(1) === '2')
    return tel.replace(/-/g, '').replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
  if (tel.length === 13)
    return tel.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}
