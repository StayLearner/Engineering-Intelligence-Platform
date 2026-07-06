import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../../../.env"),
});

import app from "./app";

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});