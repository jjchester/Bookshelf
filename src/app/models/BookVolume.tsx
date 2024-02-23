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

export function deepCopy(json: any): BookVolume {
    return {
        kind: json.kind,
        id: json.id,
        etag: json.etag,
        selfLink: json.selfLink,
        volumeInfo: {
            title: json.volumeInfo.title,
            authors: json.volumeInfo.authors,
            publisher: json.volumeInfo.publisher,
            publishedDate: json.volumeInfo.publishedDate,
            description: json.volumeInfo.description,
            industryIdentifiers: json.volumeInfo.industryIdentifiers,
            readingModes: json.volumeInfo.readingModes,
            pageCount: json.volumeInfo.pageCount,
            printedPageCount: json.volumeInfo.printedPageCount,
            dimensions: json.volumeInfo.dimensions,
            printType: json.volumeInfo.printType,
            categories: json.volumeInfo.categories,
            maturityRating: json.volumeInfo.maturityRating,
            allowAnonLogging: json.volumeInfo.allowAnonLogging,
            contentVersion: json.volumeInfo.contentVersion,
            panelizationSummary: json.volumeInfo.panelizationSummary,
            imageLinks: json.volumeInfo.imageLinks,
            language: json.volumeInfo.language,
            previewLink: json.volumeInfo.previewLink,
            infoLink: json.volumeInfo.infoLink,
            canonicalVolumeLink: json.volumeInfo.canonicalVolumeLink,
        },
        saleInfo: {
            country: json.saleInfo.country,
            saleability: json.saleInfo.saleability,
            isEbook: json.saleInfo.isEbook,
        },
        accessInfo: {
            country: json.accessInfo.country,
            viewability: json.accessInfo.viewability,
            embeddable: json.accessInfo.embeddable,
            publicDomain: json.accessInfo.publicDomain,
            textToSpeechPermission: json.accessInfo.textToSpeechPermission,
            epub: json.accessInfo.epub,
            pdf: json.accessInfo.pdf,
            webReaderLink: json.accessInfo.webReaderLink,
            accessViewStatus: json.accessInfo.accessViewStatus,
            quoteSharingAllowed: json.accessInfo.quoteSharingAllowed,
        },
    };
}

export default BookVolume;
