export default class Book {
    title: string;
    author: string;
    year: number;
    isbn: string;

    constructor(title: string, author: string, year: number, isbn: string) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isbn = isbn;
    }
}