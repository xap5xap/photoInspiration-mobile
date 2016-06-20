import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Photos} from '../models/photos';
import {Photo} from '../models/photo';
import {PhotoFilter} from '../models/photo-filter';
import {FlickrError} from '../models/flickr-error';
import {PhotoOwner} from '../models/photo-owner';
import {PhotoVisibility} from '../models/photo-visibility';
import {PhotoDate} from '../models/photo-date';
import {PhotoTag} from '../models/photo-tag';
import {PhotoExif} from '../models/photo-exif';
import {Exif} from '../models/exif';
import {PhotoUrl} from '../models/photo-url';
import {PhotoFavorite} from '../models/photo-favorite';
import {PhotosResponse} from '../models/photos-response';
import '../rxjs-operators';
import {Observable} from 'rxjs/Observable';
import {PhotoInfo} from '../models/photo-info';


@Injectable()
export class FlickrService {
    url: string = "https://api.flickr.com/services/rest/";
    api_key: string = "api_key";

    constructor(private http: Http) { }

    getInterestingness(page: number, photosResponse: PhotosResponse, photoFilter: PhotoFilter): Observable<PhotosResponse> {

        let params = new URLSearchParams();
        params.set("method", "flickr.interestingness.getList");
        params.set("api_key", this.api_key);
        params.set("format", "json");
        params.set("nojsoncallback", "1");
        params.set("per_page", "10");
        params.set("page", page.toString());
        params.set("date", photoFilter.date);

        console.log('interesingness date', photoFilter.date);

        return this.http.get(this.url, { search: params })
            .map(response => response.json())
            .map((data: any) => {
                if (data.stat === "fail") {
                    throw new FlickrError(data.stat, data.code, data.message);
                }
                let photos: Photos;
                let photosArray: Array<Photo> = [];

                data.photos.photo.forEach(photo => {
                    photosArray.push(new Photo(photo.farm, photo.id, photo.owner, photo.secret,
                        photo.server, photo.title, photo.ispublic, photo.isfriend,
                        photo.isfamily));
                }
                );
                if (!photosResponse) {
                    console.log('nuevo objeto');
                    photos = new Photos(data.photos.page, data.photos.pages, data.photos.perpage,
                        data.photos.total, photosArray);
                    return new PhotosResponse(photos, data.stat);
                }
                else {
                    console.log('reusa objeto');
                    photosResponse.photos.page = data.photos.page;
                    photosResponse.photos.photos = photosResponse.photos.photos.concat(photosArray);
                    return photosResponse;
                }
            }
            )
    }

    getPhotoInfo(photo: Photo): Observable<PhotoInfo> {
        let params = new URLSearchParams();
        params.set("method", "flickr.photos.getInfo");
        params.set("api_key", this.api_key);
        params.set("format", "json");
        params.set("nojsoncallback", "1");
        params.set("photo_id", photo.id);
        params.set("secret", photo.secret);
        return this.http.get(this.url, { search: params })
            .map(response => response.json())
            .map((data: any) => {
                console.log('Photo info', data);
                let photoOwner: PhotoOwner = new PhotoOwner(data.photo.owner.nsid, data.photo.owner.username, data.photo.owner.realname, data.photo.owner.location, data.photo.owner.iconserver, data.photo.owner.iconfarm, data.photo.owner.path_alias);
                let photoVisibility: PhotoVisibility = new PhotoVisibility(data.photo.visibility.isPublic, data.photo.visibility.isFriend, data.photo.visibility.isFamily);
                let photoDates: PhotoDate = new PhotoDate(data.photo.dates.posted, data.photo.dates.taken, data.photo.dates.takenGranularity, data.photo.dates.takenUnknown, data.photo.dates.lastUpdate);
                let photoTags: Array<PhotoTag> = [];
                data.photo.tags.tag.forEach(tag => {
                    photoTags.push(new PhotoTag(tag.id, tag.author, tag.authorName, tag.raw, tag.content, tag.machineTag))
                });
                let photoUrls: Array<PhotoUrl> = [];
                data.photo.urls.url.forEach(url => {
                    photoUrls.push(new PhotoUrl(url.type, url.url));
                });
                return new PhotoInfo(data.photo.id, data.photo.secret,
                    data.photo.server, data.photo.farm, data.photo.dateuploaded,
                    data.photo.isfavorite, data.photo.license, data.photo.safety_level,
                    data.photo.rotation, data.photo.originalsecret,
                    data.photo.originalformat, photoOwner, data.photo.title._content,
                    data.photo.description._content, photoVisibility, photoDates, data.photo.views, photoTags, photoUrls, data.photo.stat, data.photo.comments._content);
            });
    }

    getFavorites(photo: Photo): Observable<PhotoFavorite> {
        let params = new URLSearchParams();
        params.set("method", "flickr.photos.getFavorites");
        params.set("api_key", this.api_key);
        params.set("format", "json");
        params.set("nojsoncallback", "1");
        params.set("photo_id", photo.id);

        return this.http.get(this.url, { search: params })
            .map(response => response.json())
            .map((data: any) => {
                console.log('data favorites', data);

                return new PhotoFavorite(data.photo.id, data.photo.secret, data.photo.server, data.photo.farm, data.photo.page, data.photo.pages, data.photo.perpage, data.photo.total);
            });
    }

    getPhotoExif(photo: Photo): Observable<PhotoExif> {
        let params = new URLSearchParams();
        params.set("method", "flickr.photos.getExif");
        params.set("api_key", this.api_key);
        params.set("format", "json");
        params.set("nojsoncallback", "1");
        params.set("photo_id", photo.id);
        params.set("secret", photo.secret);

        return this.http.get(this.url, { search: params })
            .map(response => response.json())
            .map((data: any) => {
                console.log('PhotoExif', data);
                if (data.stat === "ok") {
                    let exifArray: Array<Exif> = [];
                    data.photo.exif.forEach(data => {
                        console.log('Exif', data);
                        let clean: string = data.clean ? data.clean._content : null;
                        exifArray.push(new Exif(data.tag, data.label, data.raw._content, clean));
                    });

                    return new PhotoExif(data.photo.id, data.photo.secret, data.photo.server, data.photo.farm, data.photo.camera, exifArray);
                }
            });
    }

}
