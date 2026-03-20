import fs from "fs";

const file = fs.readFileSync("src/data/words_github.txt", "utf-8");

export const words = file.split("\n").map(w => w.trim().toUpperCase()).filter(Boolean);

export function getRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}