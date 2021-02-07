 interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailySessions: Array<number>,
  target: number
): Result => {
  const calculateRating = (average: number) => {
    if (average > target) return 3;
    if (average > target * 0.7) return 2;
    return 1;
  };
  const ratingDescriptions = [
    "try putting more efforts into it",
    "not too bad but could be better",
    "excellent!",
  ];

  const average =
    dailySessions.reduce((sum, session) => sum + session, 0) /
    dailySessions.length;
  const rating = calculateRating(average);

  return {
    periodLength: dailySessions.length,
    trainingDays: dailySessions.filter((time) => time > 0).length,
    success: average > target,
    rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target,
    average,
  };
};

export interface calculateExercisesArgs {
  dailySessions: Array<number>;
  target: number;
}
const parseArguments = (args: Array<string>): calculateExercisesArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const [, , target, ...rest] = args;
  const dailySessions = rest.map((session) => Number(session));

  if (
    !isNaN(Number(target)) &&
    dailySessions.every((session) => !isNaN(session))
  ) {
    return {
      target: Number(target),
      dailySessions,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { dailySessions, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailySessions, target));
} catch (e) {
  // console.log("Something went wrong, error message: ", e.message);
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4


