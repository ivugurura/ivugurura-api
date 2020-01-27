import express from "express";

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "The test apis are working" });
});
/**
 * Start express server
 */
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
