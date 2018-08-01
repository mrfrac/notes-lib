export enum AlterationEnum {
    None = '',
    Flat = 'b',
    Sharp = '#',
}

export class Note {
    private _notesReference: ReadonlyArray<string> = [ 'A', '-', 'B', 'C', '-', 'D', '-', 'E', 'F', '-', 'G', '-' ];
    private noteIndex: number;
    private alteration: AlterationEnum;

    constructor(note: string, alteration = AlterationEnum.None) {
        this.alteration = alteration;
        this.noteIndex = this._notesReference.findIndex(item => item === note.toUpperCase());

        let targetIndex = this.noteIndex;

        if (this.alteration === AlterationEnum.Sharp)
            this.noteIndex = this.getActualIndex(this.noteIndex + 1);
        else if (this.alteration === AlterationEnum.Flat) {
            this.noteIndex = this.getActualIndex(this.noteIndex - 1)
        }
    }

    isValid(): boolean {
        return this.noteIndex >= 0 && this.noteIndex < this._notesReference.length;
    }

    up(htones: number = 1) {
        this.alteration = AlterationEnum.None;
        this.noteIndex = this.getActualIndex(this.noteIndex + htones);
        
        if (this._notesReference[this.noteIndex] === '-') {
            this.alteration = AlterationEnum.Sharp;
        }

        return this;
    }

    down(htones: number) {
        this.alteration = AlterationEnum.None;
        this.noteIndex = this.getActualIndex(this.noteIndex - htones);

        if (this._notesReference[this.noteIndex] === '-') {
            this.alteration = AlterationEnum.Flat;
        }

        return this;
    }

    toString() {
        if (this.isValid()) {
            return `${this.getNoteName()}${this.alteration}`
        }

        return '';
    }

    getNoteLetter(): string {
        return this.getNoteName();
    }

    getAlteration(): AlterationEnum {
        return this.alteration;
    }

    private getNoteName(): string {
        let note = this._notesReference[this.noteIndex];
        let targetIndex = this.noteIndex;

        if (note === '-') {
            if (this.alteration === AlterationEnum.Flat) {
                targetIndex = this.noteIndex + 1;
            } else if (this.alteration === AlterationEnum.Sharp) {
                targetIndex = this.noteIndex - 1;
            }
        }

        targetIndex = this.getActualIndex(targetIndex);

        return this._notesReference[targetIndex];
    }

    private getActualIndex(targetIndex: number): number {
        if (targetIndex >= this._notesReference.length) {
            targetIndex = targetIndex % this._notesReference.length;
        } else if (targetIndex < 0) {
            targetIndex = this._notesReference.length + targetIndex;
        }

        return targetIndex;
    }
}