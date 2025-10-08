// Make sure you have these imports
import express, { Request, Response } from "express";
import axios, { isAxiosError } from "axios"; // Import isAxiosError
import prisma from "../../lib/prisma.js";

const router = express.Router();

router.post("/match", async (req: Request, res: Response) => {
  try {
    const { selfie, images } = req.body;

    // Call Flask microservice
    const response = await axios.post("http://localhost:5001/compare", {
      selfie,
      images,
    });

    // Save results
    const saved = await prisma.matchResult.create({
      data: {
        selfie,
        images,
        matches: response.data.matches || [],
      },
    });

    res.json(saved);
  } catch (err) {
    // Here, 'err' is of type 'unknown'

    // **SOLUTION: CHECK THE ERROR TYPE**
    if (isAxiosError(err)) {
      // Inside this block, TypeScript now knows 'err' is an AxiosError
      // and has a 'response' property.
      console.error("Error from Python service:", err.response?.data);

      // Forward the exact error and status from Python
      res
        .status(err.response?.status || 500)
        .json(
          err.response?.data || { error: "Unknown error from Python service" }
        );
    } else {
      // Handle other kinds of errors (not from Axios)
      console.error("An unexpected error occurred:", err);
      res
        .status(500)
        .json({ error: "Face matching failed due to an unexpected error" });
    }
  }
});

export default router;
