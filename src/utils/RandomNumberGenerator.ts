export class RandomNumberGenerator {
    static getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
