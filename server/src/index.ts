import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import dynamoose from "dynamoose";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import serverless from "serverless-http";
import seed from "./seed/seedDynamodb.js";
import {
  clerkMiddleware,
  createClerkClient,
  requireAuth,
} from "@clerk/express";
/* ROUTE IMPORTS */
import courseRoutes from "./routes/courseRoutes.js";
import userClerkRoutes from "./routes/userClerkRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"
import userCourseProgressRoutes from "./routes/userCourseProgressRoutes.js"
/* CONFIGURATIONS */

dotenv.config();


const isProduction = process.env.NODE_ENV === "production";


if (!isProduction) {
    const client = new DynamoDB({
    endpoint: "http://localhost:8000",
    region: "us-east-1"
});

dynamoose.aws.ddb.set(client);
}

const clerkSecretKey = process.env.CLERK_SECRET_KEY;

if (!clerkSecretKey) {
  throw new Error("CLERK_SECRET_KEY is not set");
}

export const clerkClient = createClerkClient({
  secretKey: clerkSecretKey,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(clerkMiddleware());

/* ROUTES */

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/courses", courseRoutes);
app.use("/users/clerk", requireAuth(), userClerkRoutes);
app.use("/transactions", requireAuth(), transactionRoutes);
app.use("/users/course-progress", requireAuth(), userCourseProgressRoutes);

/* SERVER */

const PORT = process.env.PORT || 3000;
if (!isProduction) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// aws production environment
const serverlessApp = serverless(app);
export const handler = async (event: any, context: any) => {
  if (event.action === "seed") {
    await seed();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data seeded successfully" }),
    };
  } else {
    return serverlessApp(event, context);
  }
};