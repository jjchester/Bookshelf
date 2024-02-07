interface BookItem {
    id: string;
    volumeInfo: {
        title: string;
        authors: [string];
        imageLinks?: {
            thumbnail: string;
        };
    };
}