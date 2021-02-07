import express, { Request } from "express";
import { calculateBmi } from "./bmiCalculator";
import {
  calculateExercises,
  calculateExercisesArgs,
} from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi/", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  //  vs params w path

  if (!isNaN(height) && !isNaN(weight)) {
    res.json({
      height,
      weight,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight)),
    });
  } else {
    res.json({
      error: "malformatted parameters",
    });
  }
});
// http://localhost:3003/bmi?height=180&weight=72


app.post("/exercise/", (req: Request<unknown, unknown, calculateExercisesArgs>, res) => {
    const { dailySessions, target } = req.body;
    if (dailySessions === undefined || target === undefined) {
      res.json({
        error: "parameters missing",
      });
      return;
    }
    if (dailySessions.every((session) => !isNaN(session)) || !isNaN(target)) {
      res.json(calculateExercises(dailySessions, target));
    } else {
      res.json({
        error: "malformatted parameters",
      });
    }
  }
);
// POST
// {
//   "dailySessions": [1, 0, 2, 0, 3, 0, 2.5],
//   "target": 2.5
// }

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
