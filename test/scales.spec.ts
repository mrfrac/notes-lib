import { Scale } from '../src/scales';
import { Note, AlterationEnum } from '../src/notes';
import { NaturalMinorFormula, MajorFormula, HarmonicMinorFormula, MelodicMinorFormula } from '../src/formulas';

describe('Scales testing suite', () => {
    it('should correctly works with invalid root note', () => {
        const note = new Note('z', AlterationEnum.None);
        const scale = new Scale(note, NaturalMinorFormula);
        expect(scale.isValid()).toBeFalsy();
    });

    it('should correctly generate simple major scale', () => {
        const note = new Note('c', AlterationEnum.None);
        const scale = new Scale(note, MajorFormula);
        const resultScale = [];
        for (let scaleNote of scale.notes) {
            resultScale.push(scaleNote.toString());
        }

        expect(resultScale).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']);
    });

    it('should correctly generate simple natural minor scales', () => {
        let note = new Note('A', AlterationEnum.None);
        let scale = new Scale(note, NaturalMinorFormula);
        let resultScale = [];
        for (let scaleNote of scale.notes) {
            resultScale.push(scaleNote.toString());
        }

        expect(resultScale).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']);

        note = new Note('g', AlterationEnum.Sharp)
        scale = new Scale(note, NaturalMinorFormula);
        resultScale = [];
        for (let scaleNote of scale.notes) {
            resultScale.push(scaleNote.toString());
        }

        expect(resultScale).toEqual(['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#', 'G#']);

        note = new Note('c');
        scale = new Scale(note, NaturalMinorFormula);
        resultScale = [];
        for (let scaleNote of scale.notes) {
            resultScale.push(scaleNote.toString());
        }

        expect(resultScale).toEqual(['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C']);
    });

    it('should correctly generate harmonic minor scale', () => {
        const note = new Note('c', AlterationEnum.None);
        const scale = new Scale(note, HarmonicMinorFormula);

        const resultScale = [];
        for (let scaleNote of scale.notes) {
            resultScale.push(scaleNote.toString());
        }
        
        expect(resultScale).toEqual(['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B', 'C']);
    });

    it('should correctly generate melodic minor scale', () => {
        const note = new Note('c', AlterationEnum.None);
        const scale = new Scale(note, MelodicMinorFormula);

        const resultScale = [];
        for (let scaleNote of scale.notes) {
            resultScale.push(scaleNote.toString());
        }

        expect(resultScale).toEqual(['C', 'D', 'Eb', 'F', 'G', 'Ab', 'B', 'C']);
    });
});