// Example 1 - incorrect use of satisfy
const scores: Record<string, number> = {}; // record usage used as example - record widen the type of the key
scores.english = 100;
scores.maths = 100;

//Applying score with satisfy
const scoresIncorrectUseOfSatisfy = {} satisfies Record<string, number>;
// scoresIncorrectUseOfSatisfy.english = 100;   //* Property 'english' does not exist on type '{}'.
// scoresIncorrectUseOfSatisfy.maths = 100;     //* Property 'maths' does not exist on type '{}'.

// Example 2
const config = {
  wide: "100px",
  narrow: 0,
} satisfies Record<string, string | number>; //* enforcement on the value
config.wide;
//      ^?
config.narrow;
//      ^?
