import { syllable } from "syllable";
import countBy from "lodash.countby";
import take from "lodash.take";
import readingTime from "reading-time";
import { punctuation_marks } from "./punctuations";
import { syllableCount } from "syllable-count-english";

export class TextStats {
  private getWords(text: string): string[] {
    const words = text.split(/\s/).map((w) => w.toLowerCase());
    return words;
  }

  words(text: string) {
    const words = this.getWords(text);
    const filteredWords = words.filter((word) => word !== "");
    return filteredWords.length;
  }

  chars(text: string) {
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, "").length;

    return { withoutSpaces, withSpaces };
  }

  sentences(text: string) {
    let numOfSentences = 0;
    for (let i = 0; i < text.length; i++) {
      if (
        text.charAt(i) === "." ||
        text.charAt(i) === "?" ||
        text.charAt(i) === "!"
      ) {
        numOfSentences++;
      }
    }
    return numOfSentences;
  }

  punctuation(text: string) {
    let numOfPunctuation = 0;

    for (let i = 0; i < text.length; i++) {
      if (punctuation_marks.includes(text.charAt(i))) numOfPunctuation++;
    }

    return numOfPunctuation;
  }

  paragraphs(text: string) {
    const paragraphs = text.split(/\n\s*\n/);
    const nonEmptyParagraphs = paragraphs.filter(
      (paragraph) => paragraph.trim() !== ""
    );
    return nonEmptyParagraphs.length;
  }

  syllables(text: string) {
    return syllable(text);
  }

  accurateSyllables(text: string) {
    return syllableCount(text);
  }

  longWords(text: string) {
    const words = this.getWords(text);
    const longWordsCount = words
      .map((word) => {
        punctuation_marks.forEach((mark) => {
          if (word.includes(mark))
            word = word.replace(new RegExp(`(^${mark})|(${mark}$)`, "g"), "");
        });
        return word;
      })
      .filter((word) => word.length > 6).length;
    return longWordsCount;
  }

  hardWords(text: string) {
    const words = this.getWords(text);
    let hardWordsCount = 0;
    for (const w of words) {
      if (this.syllables(w) >= 3 && !w.includes("-")) hardWordsCount++;
    }
    return hardWordsCount;
  }

  mostRepeatedWords(text: string) {
    const words = this.getWords(text);
    const wordsCount = countBy(words);
    const sortedWords = Object.entries(wordsCount).sort(
      (a: [string, number], b: [string, number]) => b[1] - a[1]
    );
    let topFiveWords = take(sortedWords, 5)
      .map(([word, count]) => ({
        word,
        count,
      }))
      .filter((t) => t.count !== 1);
    return topFiveWords;
  }
  readingTimeEstimate(text: string): string {
    return readingTime(text).text;
  }
}
