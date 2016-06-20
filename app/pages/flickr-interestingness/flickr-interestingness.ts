import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {FlickrService} from '../../services/flickr.service';
import {PhotosResponse} from '../../models/photos-response'
import {Photo} from '../../models/photo'
import {FlickrError} from '../../models/flickr-error'
import {FlickrPhotoPage} from '../flickr-photo/flickr-photo';
import {PhotoFilterPage} from '../photo-filter/photo-filter';
import {PhotoFilter} from '../../models/photo-filter';

@Component({
    templateUrl: 'build/pages/flickr-interestingness/flickr-interestingness.html'
})
export class FlickrInterestingnessPage {
    photoFilter: PhotoFilter = new PhotoFilter();
    photosResponse: PhotosResponse;
    page: number = 1;
    flickrError: FlickrError;

    constructor(public nav: NavController, private flickrService: FlickrService) { }

    fillData(): boolean {
        return this.photosResponse ? true : false;
    }
    onPageLoaded() {
        this.loadInterestigness(null);
    }

    goToPhotoPage(photo: Photo) {
        this.nav.push(FlickrPhotoPage, photo);
    }

    showError() {
        if ((!this.photosResponse) && (this.flickrError)) {
            return true;
        }
        return false;
    }
    presentFilter() {
        let modal = Modal.create(PhotoFilterPage, this.photoFilter);
        this.nav.present(modal);

        modal.onDismiss((data: PhotoFilter) => {
            if (data) {
                this.photoFilter = data;
                this.resetObjects();
                this.loadInterestigness(null);
            }
        });
    }

    resetObjects() {
        this.page = 1;
        this.photosResponse = null;
    }

    loadInterestigness(infiniteScroll) {

        if ((this.photosResponse) && ((this.page - 1) === this.photosResponse.photos.pages)) {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            return;
        }
        this.flickrService.getInterestingness(this.page, this.photosResponse, this.photoFilter)
            .subscribe(data => {

                this.page = this.page + 1;
                this.photosResponse = data;

                if (infiniteScroll) {
                    infiniteScroll.complete();
                }

            },
            error => {
                this.flickrError = error;
                this.photosResponse = null;
            }
            );
    }
}
