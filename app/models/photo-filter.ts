export class PhotoFilter {
    private _date: string;

    get date(): string {
        if (!this._date) {
            return this.formatDateYYYYMMDD(new Date());
        }        
        return this._date;
    }

    set date(date: string) {
        this._date = date;
    }

    private formatDateYYYYMMDD(date: any): string {
        let valor = date.toISOString().slice(0, 10);
        return valor;
    }
}
