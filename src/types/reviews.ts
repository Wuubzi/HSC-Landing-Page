export interface Review {
    image: string,
    imageAlt: string,
    name: string,
    occupation: string,
    review: string
}

export interface reviewsData {
    [key: string]: Review;
}