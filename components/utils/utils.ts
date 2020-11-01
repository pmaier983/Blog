/*
  Copy's the string passe in to computers clipboard
*/
export const copyToClipboard = (str: string): void => {
  const el = document.createElement("textarea")
  el.value = str
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}
