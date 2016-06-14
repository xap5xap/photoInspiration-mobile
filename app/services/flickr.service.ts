import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Photos} from '../models/photos'
import {Photo} from '../models/photo'
import {PhotosResponse} from '../models/photos-response'
import '../rxjs-operators';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class FlickrService {
    url: string = "https://api.flickr.com/services/rest/";
    api_key: string = "api_key";

    constructor(private http: Http) { }

    getInterestingness(): Observable<PhotosResponse> {
        let params = new URLSearchParams();
        params.set("method", "flickr.interestingness.getList");
        params.set("api_key", this.api_key);
        params.set("format", "json");
        params.set("nojsoncallback", "1");

        return this.http.get(this.url, { search: params })
            .map(response => response.json())
            .map((data: any) => {
                console.log(`data ${data}`);
                console.log(data);
                console.log(`data.stat ${data.stat}`);
                let photos: Photos;
                let photosArray: Array<Photo> = [];

                data.photos.photo.forEach(photo => {
                    photosArray.push(new Photo(photo.farm, photo.id, photo.owner, photo.secret,
                        photo.server, photo.title, photo.ispublic, photo.isfriend,
                        photo.isfamily));
                }
                );

                photos = new Photos(data.photos.page, data.photos.pages, data.photos.perpage,
                    data.photos.total, photosArray);
                return new PhotosResponse(photos, data.stat);
            }
            )
    }

}
