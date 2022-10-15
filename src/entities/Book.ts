export class Book {
  public readonly id: string;
  public readonly directory: string;
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public readonly title: string;
  public readonly creator: string;
  public readonly wordsCount: number;
  public readonly uniqueWordsCount: number;
  public readonly a1Words: number;
  public readonly a2Words: number;
  public readonly b1Words: number;
  public readonly b2Words: number;
  public readonly c1Words: number;
  public readonly c2Words: number;
  public readonly a1Readability: number;
  public readonly a2Readability: number;
  public readonly b1Readability: number;
  public readonly b2Readability: number;
  public readonly c1Readability: number;
  public readonly c2Readability: number;

  constructor([
    id,
    directory,
    createdAt,
    updatedAt,
    title,
    creator,
    wordsCount,
    uniqueWordsCount,
    a1Words,
    a2Words,
    b1Words,
    b2Words,
    c1Words,
    c2Words,
    a1Readability,
    a2Readability,
    b1Readability,
    b2Readability,
    c1Readability,
    c2Readability,
  ]: string[]) {
    this.id = id;
    this.directory = directory;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.title = title;
    this.creator = creator;
    this.wordsCount = +wordsCount;
    this.uniqueWordsCount = +uniqueWordsCount;
    this.a1Words = +a1Words;
    this.a2Words = +a2Words;
    this.b1Words = +b1Words;
    this.b2Words = +b2Words;
    this.c1Words = +c1Words;
    this.c2Words = +c2Words;
    this.a1Readability = +a1Readability;
    this.a2Readability = +a2Readability;
    this.b1Readability = +b1Readability;
    this.b2Readability = +b2Readability;
    this.c1Readability = +c1Readability;
    this.c2Readability = +c2Readability;
  }

  get file() {
    return `https://cdn.jsdelivr.net/gh/lamp-project/library@main/${this.directory}/book.lepub`;
  }

  get cover() {
    return `https://cdn.jsdelivr.net/gh/lamp-project/library@main/${this.directory}/cover-512.jpg`;
  }

  get thumbnail() {
    return `https://cdn.jsdelivr.net/gh/lamp-project/library@main/${this.directory}/cover-256.jpg`;
  }

  async getMeta() {
    return fetch(
      `https://cdn.jsdelivr.net/gh/lamp-project/library@main/${this.directory}/meta.json`
    ).then((res) => res.json());
  }

  async getWords(): Promise<{ [keys: string]: number }> {
    return fetch(
      `https://cdn.jsdelivr.net/gh/lamp-project/library@main/${this.directory}/words.json`
    ).then((res) => res.json());
  }
}
