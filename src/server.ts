import { createApp } from "./createApp";

const app = createApp();

app.listen(3000, () => {
  console.log("My app listening on port 3000!");
});