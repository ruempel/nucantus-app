export class Challenge {
    constructor(
        public id: number,
        public songId: number,
        public challengingPlayer: string,
        public joiningPlayer: string | null
    ) {
    }
}
