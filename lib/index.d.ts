declare module "Note" {
    export enum AlterationEnum {
        None = "",
        Flat = "b",
        Sharp = "#"
    }
    export class Note {
        private _notesReference;
        private noteIndex;
        private alteration;
        constructor(note: string, alteration?: AlterationEnum);
        isValid(): boolean;
        up(htones?: number): this;
        down(htones: number): this;
        toString(): string;
        getNoteLetter(): string;
        getAlteration(): AlterationEnum;
        private getNoteName;
        private getActualIndex;
    }
}
declare module "formulas" {
    export interface ScaleFormula {
        formula: ReadonlyArray<number>;
        raises?: ReadonlyArray<number>;
        falls?: ReadonlyArray<number>;
    }
    export const NaturalMinorFormula: ScaleFormula;
    export const MajorFormula: ScaleFormula;
    export const HarmonicMajorFormula: ScaleFormula;
    export const MelodicMajorFormula: ScaleFormula;
    export const HarmonicMinorFormula: ScaleFormula;
    export const MelodicMinorFormula: ScaleFormula;
}
declare module "Scale" {
    import { Note } from "Note";
    import { ScaleFormula } from "formulas";
    export class Scale {
        private formula;
        private rootNote;
        readonly notes: Note[];
        /**
         * @todo Check D-flat melodic minor
         */
        constructor(rootNote: Note, formula: ScaleFormula);
        isValid(): boolean;
        getParallelScale(): Scale | undefined;
    }
}
declare module "index" {
    import { Scale } from "Scale";
    import { Note, AlterationEnum } from "Note";
    export { AlterationEnum, Note, Scale };
}
