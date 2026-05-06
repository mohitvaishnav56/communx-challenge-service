import app from "./app";
import { config } from "dotenv";
import main from "./utils/openRouter.util";
import { initCronJobs } from "./cron/challenge.cron";

config();
const port = process.env.PORT || 8000;

app.listen(port, async () => {
  // await main();
  initCronJobs();
  console.log("server is running on port: ", port);
});
