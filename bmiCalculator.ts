const calculateBmi = (height: number, weight: number): string => {
  const heightInCm = height / 100;
  const bmi = weight / (heightInCm * heightInCm);
  // normally can't use switch statement comparing number to boolean expression, instead of switch(bmi), switch(true) and the expression in the cases define where it applies
  // switch (true) {
  //   case bmi < 18.5:
  //     return "Underweight (unhealthy weight)";
  //   case bmi < 25:
  //     return "Underweight (unhealthy weight)";
  //   case bmi < 30:
  //     return "Underweight (unhealthy weight)";
  //   case bmi < 18.5:
  //     return "Underweight (unhealthy weight)";
  //   default:
  //     throw new Error("Error: not a number");
  // }
  if (isNaN(bmi)) {
    throw new Error("Error, not a number");
  }
  if (bmi < 18.5) {
    return "Underweight (unhealthy weight)";
  }
  if (bmi < 25) {
    return "Normal (healthy weight)";
  }
  if (bmi < 30) {
    return "Overweight (unhealthy weight)";
  }
  return "Obese (unhealthy weight)";
};

interface BmiArgs {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  // console.log("Something went wrong, error message: ", e.message);
}

// console.log(calculateBmi(180, 74));
export { calculateBmi };
