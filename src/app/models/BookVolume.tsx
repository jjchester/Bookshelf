interface BookVolumeInfo {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
        type: string;
        identifier: string;
    }[];
    readingModes: {
        text: boolean;
        image: boolean;
    };
    pageCount: number;
    printedPageCount: number;
    dimensions: {
        height: string;
        width: string;
        thickness: string;
    };
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
    };
    imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
        small: string;
        medium: string;
        large: string;
        extraLarge: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
}

interface BookSaleInfo {
    country: string;
    saleability: string;
    isEbook: boolean;
}

interface BookAccessInfo {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
        isAvailable: boolean;
    };
    pdf: {
        isAvailable: boolean;
        acsTokenLink: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
}

interface BookVolume {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: BookVolumeInfo;
    saleInfo: BookSaleInfo;
    accessInfo: BookAccessInfo;
}

export default BookVolume;
