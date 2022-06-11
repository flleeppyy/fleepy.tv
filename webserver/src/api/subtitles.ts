import type { FastifyInstance } from "fastify";

export const subtitles = [
  "this page is badly coded.",
  "yeah i make music, but is it good?",
  "bad coding practices all around",
  "i like synthesizers",
  "i want a Mother 32 and a DFAM",
  "i love chen :3",
  "i absolutely adore chen",
  "chen is very cute!",
  "<a href='https://twitter.com/htfcirno2000'>htfcirno2000</a> is very awesome :3",
  "<a href='https://twitter.com/smolespi'>Espi</a> is very cool, talented, and awesome c:",
  "cheeeeeeeeeeeeeeeeen",
  "CHEN!",
  "wish i could downloadmoreram.com",
  "rammeintoadoorstop.com",
  "do you ever just feel like afdlkajshdfkajwefiueafhiew woefhawefijw",
  "sleep schedule? what's that",
  "uwu?",
  "owo",
  "òwó",
  "I spend my time not watching anime, but writing bad code",
  "my music is the definition of hot garbage",
  "hot garbage",
  "did you know, if you stop thinking, you wont be able to think?",
  "i love yuri",
  "cute and stupid.",
  "i may be stupid",
  "i may have the stupid",
  "h",
];

export const randomSubtitle = () => subtitles[Math.floor(Math.random() * subtitles.length)];

export default (app: FastifyInstance) => {
  app.get("/api/subtitles", (req, res) => {
    res.send({
      subtitles,
    });
  });
};
