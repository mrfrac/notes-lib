import { AlterationEnum, Note, Scale } from '../src';
import { NaturalMinorFormula, MajorFormula, HarmonicMinorFormula, MelodicMinorFormula, HarmonicMajorFormula, MelodicMajorFormula } from '../src/formulas';

describe('Scales testing suite', () => {
    it('should correctly works with invalid root note', () => {
        const note = new Note('z');
        const scale = new Scale(note, NaturalMinorFormula);
        expect(scale.isValid()).toBeFalsy();
    });

    it('should correctly generate simple major scale', () => {
        const note = new Note('c');
        const scale = new Scale(note, MajorFormula);

        expect(scale.toStringArray()).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']);
    });

    it("should correctly generate harmonic major scale", () => {
        const note = new Note('c');
        const scale = new Scale(note, HarmonicMajorFormula);

        expect(scale.toStringArray()).toEqual(['C', 'D', 'E', 'F', 'G', 'Ab', 'B', 'C']);
    });

    it("should correctly generate melodic major scale", () => {
        const note = new Note('c');
        const scale = new Scale(note, MelodicMajorFormula);

        expect(scale.toStringArray()).toEqual(['C', 'D', 'E', 'F', 'G', 'Ab', 'Bb', 'C']);
    });

    it('should correctly generate simple natural minor scales', () => {
        let note = new Note('A');
        let scale = new Scale(note, NaturalMinorFormula);

        expect(scale.toStringArray()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']);

        note = new Note('g', AlterationEnum.Sharp)
        scale = new Scale(note, NaturalMinorFormula);

        expect(scale.toStringArray()).toEqual(['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#']);

        note = new Note('c');
        scale = new Scale(note, NaturalMinorFormula);

        expect(scale.toStringArray()).toEqual(['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']);
    });

    it('should correctly generate harmonic minor scale', () => {
        const note = new Note('c');
        const scale = new Scale(note, HarmonicMinorFormula);
        
        expect(scale.toStringArray()).toEqual(['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B', 'C']);
    });

    it('should correctly generate melodic minor scale', () => {
        const note = new Note('c');
        const scale = new Scale(note, MelodicMinorFormula);

        expect(scale.toStringArray()).toEqual(['C', 'D', 'Eb', 'F', 'G', 'A', 'B', 'C']);
    });
});