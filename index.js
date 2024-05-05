const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const {sequelize} = require('./models')
const { authenticateToken } = require('./middleware/authMiddleware')
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')
const commentRoutes = require('./routes/commentRoutes')

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to the Blogging Platform API");
});

app.use('/auth', authRoutes);
app.use('/blog', authenticateToken, blogRoutes)
app.use('/comments', authenticateToken, commentRoutes)
app.all('*',(req,res) => res.json({message:"Invalid Route"}))

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went Wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
