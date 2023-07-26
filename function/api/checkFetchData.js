export function checkFetchData(res) {
  if (res.ok) {
    return res.text();
  }
  return res.text().then((error) => {
    const e = new Error("Упс  , что то пошло не так...");
    e.data = error;
    throw e;
  });
}
