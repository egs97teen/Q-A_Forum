export class Answer {
	constructor (
		public content: string ="",
		public details: string ="",
		public like_count: number = 0,
		public _user: string="",
		public _question: string=""
		) {}
}
