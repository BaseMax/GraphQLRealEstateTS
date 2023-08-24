import * as express from 'express';

const app = express();
const port = process.env.PORT || 3001;



app.listen(port , ()=>{
    console.clear()
    console.log(process.version)
    console.log(`app runing on port ` , port)
})
