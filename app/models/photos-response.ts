import {Photos} from './photos';

export class PhotosResponse {
  constructor(
    public photos: Photos,
    public stat: string
  ) { }
}
