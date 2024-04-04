# Text Analyzer

A lightweight npm package for analyzing text statistics.

The package finds the following stats:

- Words count.
- Char count (with and without spaces).
- Sentences.
- Paragraphs.
- Punctuations.
- Syllables (accurate and estimated).
- Long words (more than six chars).
- Hard words (contain three or more syllables).
- Top five repeated words.
- Reading time estimate.

## Installation

```bash
npm install text-analyzer
```

## Usage

Import calculate instance:

```typescript
import { calculate } from "text-analyzer";

const text = "This is a great package!";

calculate.chars(text).withSpaces;
```

## Notes

1. Most repeated words output returns the word and its count:

```typescript
[
  { word: "and", count: 8 },
  { word: "a", count: 7 },
  { word: "in", count: 6 },
  { word: "i", count: 4 },
  { word: "an", count: 4 },
];
```

2. Reading time returned value is a string, eg: "1 min".

3. The `accurateSyllables()` method only runs on server as it needs to access fs.

## Dependencies

- [syllable](https://www.npmjs.com/package/syllable): used in calculate.syllables().
- [lodash](https://www.npmjs.com/package/lodash).
- [reading-time](https://www.npmjs.com/package/reading-time): used in calculate.readingTimeEstimate().
- [syllable-count-english](https://www.npmjs.com/package/syllable-count-english): calculate.accurateSyllables().

## Contributions

Any contribution is welcomed and highly appreciated.
