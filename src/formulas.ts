export interface IScaleFormula {
  formula: ReadonlyArray<number>;
  raises?: ReadonlyArray<number>;
  falls?: ReadonlyArray<number>;
}

export const NaturalMinorFormula: IScaleFormula = {
  formula: [2, 1, 2, 2, 1, 2, 2],
};

export const MajorFormula: IScaleFormula = {
  formula: [2, 2, 1, 2, 2, 2, 1],
};

export const HarmonicMajorFormula: IScaleFormula = {
  falls: [5],
  formula: MajorFormula.formula,
};

export const MelodicMajorFormula: IScaleFormula = {
  falls: [5, 6],
  formula: MajorFormula.formula,
};

export const HarmonicMinorFormula: IScaleFormula = {
    formula: NaturalMinorFormula.formula,
    raises: [6],
};

export const MelodicMinorFormula: IScaleFormula = {
    formula: NaturalMinorFormula.formula,
    raises: [5, 6],
};
