import {Utils} from './utils';

export class PhotoFilter {
    private _date: string;

    get date(): string {
        if (!this._date) {
            this._date = Utils.yesterdayDateFormated();            
        }
        return this._date;
    }

    set date(date: string) {
        this._date = date;
    }

}
