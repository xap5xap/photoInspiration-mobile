export class Photo {
  constructor(
    public farm: number,
    public id: string,
    public owner: string,
    public secret: string,
    public server: string,
    public title: string,
    public ispublic: boolean,
    public isfriend: boolean,
    public isfamily: boolean
  ) { }

  private getPhotoUrl(size: string): string {
    return `https://farm${this.farm}.staticflickr.com/${this.server}/${this.id}_${this.secret}_${size}.jpg`
  }
  public getSmallSquareImageUrl(): string {
    return this.getPhotoUrl("s");
  }
  public getLargeSquareImageUrl(): string {
    return this.getPhotoUrl("q");
  }
  public getThumbnailImageUrl(): string {
    return this.getPhotoUrl("t");
  }
  public getSmall240ImageUrl(): string {
    return this.getPhotoUrl("m");
  }
  public getSmall320ImageUrl(): string {
    return this.getPhotoUrl("n");
  }
  public getMedium640ImageUrl(): string {
    return this.getPhotoUrl("z");
  }
  public getMedium800ImageUrl(): string {
    return this.getPhotoUrl("c");
  }
  public getLarge1024ImageUrl(): string {
    return this.getPhotoUrl("b");
  }
  public getLarge1600ImageUrl(): string {
    return this.getPhotoUrl("h");
  }
  public getLarge2048ImageUrl(): string {
    return this.getPhotoUrl("k");
  }

}
