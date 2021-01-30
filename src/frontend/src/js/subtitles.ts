
  const subtitles = [
    "some irrelevant",
    "yes im stupid",
    "this page is badly coded. seriously, look at the <a href='https://github.com/flleeppyy/fleepy.tv' onclick='return false'>repo</a>.",
    "yeah i make music, but is it good?",
    "bad coding practices all around",
    "i like synthesizers",
    "i want a Mother 32 and a DFAM",
    "i love chen :3",
    "i absolutely adore chen",
    "chen is very cute!",
    "<a href='https://twitter.com/htfcirno2000'>htfcirno2000</a> is very awesome :3",
    "<a href='https://twitter.com/smolespi'>Espi</a> is very cool, talented, and awesome c:",
    "<a href='https://twitter.com/_mianyaa'>Mia</a> is cewl ^w^",
    "cheeeeeeeeeeeeeeeeen",
    "CHEN!",
    "wish i could downloadmoreram.com",
    "do you ever just feel like afdlkajshdfkajwefiueafhiew woefhawefijw",
    "yes i have a screwed up sleep schedule",
    "uwu?",
    "owo",
    "òwó",
    "I spend my time not watching anime, but writing bad code",
    "my music is the definition of hot garbage",
    "hot garbage",
    "did you know, if you stop thinking, you wont be able to think?",
    "god i love yuri, most beautiful thing ever, girls in bliss"
  ]
  const ST = $('#subtitle')
  let prevST: number;
  const setST: Function = () => { // ITS CLEARLY A FUNCTION... CLEARLY
    const a: number = Math.floor(Math.random() * subtitles.length)
    const b: string = subtitles[a];
    if (a === prevST) {return setST()}
    prevST = a;
    ST.html(b)
  }
  setST()
  ST.on('click', () => {
    setST()
  })
