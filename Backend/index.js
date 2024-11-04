const express = require("express");
const cors = require("cors");
const cluster = require("cluster");
const os = require("os");

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = require("./db");
const userRouter = require("./Routes/user");
const ProductRouter = require("./Routes/Mobileproduct");
const cartRouter = require("./Routes/Cart");
const wishRouter = require("./Routes/Wishlist");
const paymentRouter = require("./Routes/Payment");

connectDB();

app.use("/user", userRouter);
app.use("/MobileProductRouter", ProductRouter);
app.use("/cartRouter", cartRouter);
app.use("/wishRouter", wishRouter);
app.use("/paymentRouter", paymentRouter);

const PORT = 5500;

// Function to start the server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};


if (cluster.isMaster) {
    const numCPUs = os.cpus().length; 
    console.log(`Master ${process.pid} is running`);

   
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        
        cluster.fork();
    });
} else {
   
    startServer();
    console.log(`Worker ${process.pid} started`);
}
