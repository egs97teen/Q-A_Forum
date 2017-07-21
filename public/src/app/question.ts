export class Question {
	constructor (
		public content: string ="",
		public description: string ="",
		public _user: string = "",
		public answer_count: number = 0,
		public answers = []
		) {}
}
