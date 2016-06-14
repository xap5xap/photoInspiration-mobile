import {Photo} from './photo';

export class Photos {
  constructor(
    public page: number,
    public pages: number,
    public perpage: number,
    public total: number,
    public photos: Array<Photo>
  ) { }
}
