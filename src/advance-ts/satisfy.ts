const scores: Record<string, number> = {};
scores.english = 100;
scores.maths = 100;

//Applying score with satisfy
const scoresIncorrectUseOfSatisfy = {} satisfies Record<string, number>;
// scoresIncorrectUseOfSatisfy.english = 100;   //* Property 'english' does not exist on type '{}'.
// scoresIncorrectUseOfSatisfy.maths = 100;     //* Property 'maths' does not exist on type '{}'.
