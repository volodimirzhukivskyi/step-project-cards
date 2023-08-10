export function checkFetchData(res) {
  if (res.ok) {
    return res.text();
  }else{
   return res.text().then((text) => {
      throw new Error(text);
    })  ;
  }

}
