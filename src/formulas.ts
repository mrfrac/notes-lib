export interface ScaleFormula {
    formula: ReadonlyArray<number>,
    raises?: ReadonlyArray<number>,
    falls?: ReadonlyArray<number>
}

export const NaturalMinorFormula: ScaleFormula = {
    formula: [2, 1, 2, 2, 1, 2, 2]
};

export const MajorFormula: ScaleFormula = {
    formula: [2, 2, 1, 2, 2, 2, 1]
};

export const HarmonicMajorFormula: ScaleFormula = {
    formula: MajorFormula.formula,
    falls: [5]
}

export const MelodicMajorFormula: ScaleFormula = {
    formula: MajorFormula.formula,
    falls: [5, 6]
};

export const HarmonicMinorFormula: ScaleFormula = {
    formula: NaturalMinorFormula.formula,
    raises: [6]
}

export const MelodicMinorFormula: ScaleFormula = {
    formula: NaturalMinorFormula.formula,
    raises: [5, 6]
}