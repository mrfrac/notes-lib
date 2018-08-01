System.register("Note", [], function (exports_1, context_1) {
    "use strict";
    var AlterationEnum, Note;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (AlterationEnum) {
                AlterationEnum["None"] = "";
                AlterationEnum["Flat"] = "b";
                AlterationEnum["Sharp"] = "#";
            })(AlterationEnum || (AlterationEnum = {}));
            exports_1("AlterationEnum", AlterationEnum);
            Note = /** @class */ (function () {
                function Note(note, alteration) {
                    if (alteration === void 0) { alteration = AlterationEnum.None; }
                    this._notesReference = ['A', '-', 'B', 'C', '-', 'D', '-', 'E', 'F', '-', 'G', '-'];
                    this.alteration = alteration;
                    this.noteIndex = this._notesReference.findIndex(function (item) { return item === note.toUpperCase(); });
                    var targetIndex = this.noteIndex;
                    if (this.alteration === AlterationEnum.Sharp)
                        this.noteIndex = this.getActualIndex(this.noteIndex + 1);
                    else if (this.alteration === AlterationEnum.Flat) {
                        this.noteIndex = this.getActualIndex(this.noteIndex - 1);
                    }
                }
                Note.prototype.isValid = function () {
                    return this.noteIndex >= 0 && this.noteIndex < this._notesReference.length;
                };
                Note.prototype.up = function (htones) {
                    if (htones === void 0) { htones = 1; }
                    this.alteration = AlterationEnum.None;
                    this.noteIndex = this.getActualIndex(this.noteIndex + htones);
                    if (this._notesReference[this.noteIndex] === '-') {
                        this.alteration = AlterationEnum.Sharp;
                    }
                    return this;
                };
                Note.prototype.down = function (htones) {
                    this.alteration = AlterationEnum.None;
                    this.noteIndex = this.getActualIndex(this.noteIndex - htones);
                    if (this._notesReference[this.noteIndex] === '-') {
                        this.alteration = AlterationEnum.Flat;
                    }
                    return this;
                };
                Note.prototype.toString = function () {
                    if (this.isValid()) {
                        return "" + this.getNoteName() + this.alteration;
                    }
                    return '';
                };
                Note.prototype.getNoteLetter = function () {
                    return this.getNoteName();
                };
                Note.prototype.getAlteration = function () {
                    return this.alteration;
                };
                Note.prototype.getNoteName = function () {
                    var note = this._notesReference[this.noteIndex];
                    var targetIndex = this.noteIndex;
                    if (note === '-') {
                        if (this.alteration === AlterationEnum.Flat) {
                            targetIndex = this.noteIndex + 1;
                        }
                        else if (this.alteration === AlterationEnum.Sharp) {
                            targetIndex = this.noteIndex - 1;
                        }
                    }
                    targetIndex = this.getActualIndex(targetIndex);
                    return this._notesReference[targetIndex];
                };
                Note.prototype.getActualIndex = function (targetIndex) {
                    if (targetIndex >= this._notesReference.length) {
                        targetIndex = targetIndex % this._notesReference.length;
                    }
                    else if (targetIndex < 0) {
                        targetIndex = this._notesReference.length + targetIndex;
                    }
                    return targetIndex;
                };
                return Note;
            }());
            exports_1("Note", Note);
        }
    };
});
System.register("formulas", [], function (exports_2, context_2) {
    "use strict";
    var NaturalMinorFormula, MajorFormula, HarmonicMajorFormula, MelodicMajorFormula, HarmonicMinorFormula, MelodicMinorFormula;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("NaturalMinorFormula", NaturalMinorFormula = {
                formula: [2, 1, 2, 2, 1, 2, 2]
            });
            exports_2("MajorFormula", MajorFormula = {
                formula: [2, 2, 1, 2, 2, 2, 1]
            });
            exports_2("HarmonicMajorFormula", HarmonicMajorFormula = {
                formula: MajorFormula.formula,
                falls: [5]
            });
            exports_2("MelodicMajorFormula", MelodicMajorFormula = {
                formula: MajorFormula.formula,
                falls: [5, 6]
            });
            exports_2("HarmonicMinorFormula", HarmonicMinorFormula = {
                formula: NaturalMinorFormula.formula,
                raises: [6]
            });
            exports_2("MelodicMinorFormula", MelodicMinorFormula = {
                formula: NaturalMinorFormula.formula,
                raises: [5, 6]
            });
        }
    };
});
System.register("Scale", ["Note"], function (exports_3, context_3) {
    "use strict";
    var Note_1, Scale;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (Note_1_1) {
                Note_1 = Note_1_1;
            }
        ],
        execute: function () {
            Scale = /** @class */ (function () {
                /**
                 * @todo Check D-flat melodic minor
                 */
                function Scale(rootNote, formula) {
                    this.notes = [];
                    this.rootNote = rootNote;
                    this.formula = formula;
                    if (this.isValid()) {
                        this.notes.push(this.rootNote);
                        for (var _i = 0, _a = this.formula.formula; _i < _a.length; _i++) {
                            var htone = _a[_i];
                            var prevNote = this.notes[this.notes.length - 1];
                            var newNote = new Note_1.Note(prevNote.getNoteLetter(), prevNote.getAlteration());
                            newNote.up(htone);
                            if (this.rootNote.getAlteration() === Note_1.AlterationEnum.Flat && newNote.getAlteration() === Note_1.AlterationEnum.Sharp) {
                                newNote.up(1).down(1);
                            }
                            else if (this.rootNote.getAlteration() === Note_1.AlterationEnum.Sharp && newNote.getAlteration() === Note_1.AlterationEnum.Flat) {
                                newNote.down(1).up(1);
                            }
                            // say NO to note dupes
                            if (prevNote.toString()[0] === newNote.toString()[0]) {
                                newNote.up(1).down(1);
                            }
                            this.notes.push(newNote);
                        }
                        if (this.formula.raises) {
                            for (var _b = 0, _c = this.formula.raises; _b < _c.length; _b++) {
                                var index = _c[_b];
                                if (this.notes[index]) {
                                    this.notes[index].up();
                                }
                            }
                        }
                        if (this.formula.falls) {
                            for (var _d = 0, _e = this.formula.falls; _d < _e.length; _d++) {
                                var index = _e[_d];
                                if (this.notes[index]) {
                                    this.notes[index].down(1);
                                }
                            }
                        }
                    }
                }
                Scale.prototype.isValid = function () {
                    return this.rootNote.isValid();
                };
                Scale.prototype.getParallelScale = function () {
                    if (!this.isValid)
                        return;
                };
                return Scale;
            }());
            exports_3("Scale", Scale);
        }
    };
});
System.register("index", ["Scale", "Note"], function (exports_4, context_4) {
    "use strict";
    var Scale_1, Note_2;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Scale_1_1) {
                Scale_1 = Scale_1_1;
            },
            function (Note_2_1) {
                Note_2 = Note_2_1;
            }
        ],
        execute: function () {
            exports_4("Scale", Scale_1.Scale);
            exports_4("Note", Note_2.Note);
            exports_4("AlterationEnum", Note_2.AlterationEnum);
        }
    };
});
