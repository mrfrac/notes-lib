import { Note, AlterationEnum } from '../src';

describe('Notes.Note testing', () => {
    let note: Note;

    beforeAll(() => {
        note = new Note('a', AlterationEnum.Flat);
    });

    it('must be created', () => {
        expect(note).toBeTruthy();
    });

    it('must be valid', () => {
        expect(note.isValid()).toBeTruthy();
    });

    it('must be displayed correctly', () => {
        expect(note.toString()).toBe("Ab");
    });

    it('should correctly up note', () => {
        note.up(1)
        expect(note.toString()).toBe('A');
        note.up(1);
        expect(note.toString()).toBe('A#');
        note.up(1);
        expect(note.toString()).toBe('B');
        note.up(12);
        expect(note.toString()).toBe('B');
    });

    it('should correctlu down note', () => {
        note.down(1);
        expect(note.toString()).toBe('Bb');
        note.up(2);
        note.down(1);
        expect(note.toString()).toBe('B');
        note.down(12);
        expect(note.toString()).toBe('B');
    });

    it('should correctly works with invalid note', () => {
        const note = new Note('z', AlterationEnum.None);
        expect(note.isValid()).toBeFalsy();
    });
});