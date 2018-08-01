export enum AlterationEnum {
  None = '',
  Flat = 'b',
  Sharp = '#',
}

export class Note {
  private alteration: AlterationEnum;
  private notesReference: ReadonlyArray<string> = [ 'A', '-', 'B', 'C', '-', 'D', '-', 'E', 'F', '-', 'G', '-' ];
  private noteIndex: number;

  constructor(note: string, alteration = AlterationEnum.None) {
    this.alteration = alteration;
    this.noteIndex = this.notesReference.findIndex((item) => item === note.toUpperCase());

    if (this.alteration === AlterationEnum.Sharp) {
      this.noteIndex = this.getActualIndex(this.noteIndex + 1);
    } else if (this.alteration === AlterationEnum.Flat) {
      this.noteIndex = this.getActualIndex(this.noteIndex - 1);
    }
  }

  public isValid(): boolean {
    return this.noteIndex >= 0 && this.noteIndex < this.notesReference.length;
  }

  public up(htones: number = 1) {
    this.alteration = AlterationEnum.None;
    this.noteIndex = this.getActualIndex(this.noteIndex + htones);

    if (this.notesReference[this.noteIndex] === '-') {
      this.alteration = AlterationEnum.Sharp;
    }

    return this;
  }

  public down(htones: number = 1) {
    this.alteration = AlterationEnum.None;
    this.noteIndex = this.getActualIndex(this.noteIndex - htones);

    if (this.notesReference[this.noteIndex] === '-') {
      this.alteration = AlterationEnum.Flat;
    }

    return this;
  }

  public toString() {
    if (this.isValid()) {
      return `${this.getNoteName()}${this.alteration}`;
    }

    return '';
  }

  public getNoteLetter(): string {
    return this.getNoteName();
  }

  public getAlteration(): AlterationEnum {
    return this.alteration;
  }

  private getNoteName(): string {
    const note = this.notesReference[this.noteIndex];
    let targetIndex = this.noteIndex;

    if (note === '-') {
      if (this.alteration === AlterationEnum.Flat) {
        targetIndex = this.noteIndex + 1;
      } else if (this.alteration === AlterationEnum.Sharp) {
        targetIndex = this.noteIndex - 1;
      }
    }

    targetIndex = this.getActualIndex(targetIndex);

    return this.notesReference[targetIndex];
  }

  private getActualIndex(targetIndex: number): number {
    if (targetIndex >= this.notesReference.length) {
      targetIndex = targetIndex % this.notesReference.length;
    } else if (targetIndex < 0) {
      targetIndex = this.notesReference.length + targetIndex;
    }

    return targetIndex;
  }
}
