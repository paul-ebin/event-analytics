import "dotenv/config";
import "./server";
import { connectDatabase } from "./db/db";

async function bootstrap() {
  await connectDatabase();

await import("./server");
}
bootstrap();