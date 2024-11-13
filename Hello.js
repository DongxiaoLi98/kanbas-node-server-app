//console.log("Hello World from Hello.js");
{/*export default function HelloRoutes(app){
    app.get("/hello", (req, res)=>{
    res.send("Hello World!Life!");
}); // tell server what should happend when comes in
                //(req, res)=>{}: lambda syntax, [object res:generate response]

app.get('/', (req, res)=>{
        res.send("Welcome to Full Stack Development!");})}
*/}
export default function Hello(app) {
    app.get('/hello', (req, res) => {res.send('Lift is good!')})
    app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
}
