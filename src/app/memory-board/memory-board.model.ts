export class memoryCards {
    public frontImage: string;
    public backImage: string;
  flipped: boolean;
    constructor(backImage: string, frontImage: string){
        this.frontImage = frontImage;
        this.backImage = backImage;
    }
}