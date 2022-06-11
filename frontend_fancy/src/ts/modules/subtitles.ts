export default async () => {
  const apiUrl = await fetch("/api/subtitles");
  const subtitles = await apiUrl.json();

  const ST = $("#subtitle");
  let prevST: number;
  const setST = () => {
    const a: number = Math.floor(Math.random() * subtitles.length);
    const b: string = subtitles[a];
    if (a === prevST) {
      setST();
      return;
    }
    prevST = a;
    ST.html(b);
  };
  setST();
  ST.on("click", () => {
    setST();
  });
  return;
};
