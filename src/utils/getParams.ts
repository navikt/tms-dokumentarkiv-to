export function getParams(url: URL) {
  const [_, base, language] = url.pathname.split("/");
  console.log(_, base, language);

}
