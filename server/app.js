const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

//import routes
const authRoutes =  require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoute = require('./routes/jobsTypeRoutes')
const jobRoute = require("./routes/jobsRoutes")

//database connection
mongoose.connect(process.env.DATABASE, {
}).then(() => console.log("DB connected"))
    .catch((err) => console.log(err));


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:"5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
//For Authentication 
app.use(cookieParser());

//cors for making requests to backend
app.use(cors());

//ROUTES MIDDLEWARE
// app.get('/', (req,res)=>{
//     res.send("Hello from Node Framewok ExpressJS")
// })
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",jobTypeRoute);
app.use("/api",jobRoute);


//error middleware
app.use(errorHandler);

//port 
const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});