import { Note, AlterationEnum } from './Note';
import { ScaleFormula } from './formulas';

export class Scale {
    private formula: ScaleFormula;
    private rootNote: Note;
    public readonly notes: Note[] = [];

    /**
     * @todo Check D-flat melodic minor
     */
    constructor(rootNote: Note, formula: ScaleFormula) {
        this.rootNote = rootNote;
        this.formula = formula;

        if (this.isValid()) {
            this.notes.push(this.rootNote);
            for (let htone of this.formula.formula) {
                const prevNote = this.notes[this.notes.length - 1];
                const newNote = new Note(prevNote.getNoteLetter(), prevNote.getAlteration());
                newNote.up(htone);

                if (this.rootNote.getAlteration() === AlterationEnum.Flat && newNote.getAlteration() === AlterationEnum.Sharp) {
                    newNote.up(1).down(1);
                } else if (this.rootNote.getAlteration() === AlterationEnum.Sharp && newNote.getAlteration() === AlterationEnum.Flat) {
                    newNote.down(1).up(1);
                }

                // say NO to note dupes
                if (prevNote.toString()[0] === newNote.toString()[0]) {
                    newNote.up(1).down(1);
                }

                this.notes.push(newNote);
            }

            if (this.formula.raises) {
                for (let index of this.formula.raises) {
                    if (this.notes[index]) {
                        this.notes[index].up();
                    }
                }
            }

            if (this.formula.falls) {
                for (let index of this.formula.falls) {
                    if (this.notes[index]) {
                        this.notes[index].down(1);
                    }
                }
            }
        }
    }

    public isValid(): boolean {
        return this.rootNote.isValid();
    }
}