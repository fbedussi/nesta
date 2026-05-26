export type Model = {
	surveyCompleted: boolean;
	birdName: string;
	photos: Photo[];
	surveyAnswers: {
		"1": number | null;
		"2": number | null;
		"3": number | null;
		"4": number | null;
		"5": number | null;
	};
};

export type Photo = {
	url: string;
	alt: string;
	date: ISODateString;
};

export type ISODateString = string; // e.g. "2024-06-01T12:00:00Z"
