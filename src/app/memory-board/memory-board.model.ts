export class memoryCards {
    public frontImage: string;
    public backImage: string;
  flipped: any;
  flipped1: boolean;
  disable: any;
    constructor(backImage: string, frontImage: string){
        this.frontImage = frontImage;
        this.backImage = backImage;
    }
}