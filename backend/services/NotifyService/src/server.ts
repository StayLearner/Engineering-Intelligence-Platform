import app from './app';


const port = process.env.PORT || 3002;




// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});