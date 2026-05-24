export type Model = {
	surveyCompleted: boolean;
	birdName: string;
	photos: Photo[];
};

export type Photo = {
	url: string;
	alt: string;
	date: ISODateString;
};

export type ISODateString = string; // e.g. "2024-06-01T12:00:00Z"
