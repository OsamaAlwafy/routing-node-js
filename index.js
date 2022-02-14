
const http=require("http");
const url=require("url");
const fs=require("fs");
var page=null;
const server=http.createServer((req,res)=>{
  //page=req.url;
  var name = url.parse(req.url).pathname;
  var query=url.parse(req.url).query;
  var filename="";
 
  if(name=="/home" || name=="/blog" || name=="/index.html" || name=="/")
  filename="./index.html";
  
  
  
  else if(((query=="role=admin")&&(name=="/admin")) || name=="/admin.html"  )
  {
     filename="./admin.html";
     
  }
  else if(name=="/admin" ||name=="/login.html")
  {
    filename="./login.html"
  }
  else
  {
    filename="./404.html"
  }
 console.log(name);
 
  if (name.includes('.css')) {
    /*
    const readStream = fs.createReadStream('./pages/home.css');
    res.writeHead(200,{'Content-type': 'text/html'});
    readStream.pipe(res);
    */
   filename="./"+name;
    render(res,filename);

  }
  /*
  if(name.includes(".png") || name.includes(".jpg"))
  {
    filename="./images"+name;
    render(res,filename);
  }
  if(name.includes(".js"))
  {
    filename="./js"+name;
    render(res,filename);
  }
  */

  if(filename)
		render(res, filename);

       
    function render(res, htmlFile) {
      fs.stat("./"+htmlFile, (err, stats) => {
      res.statusCode = 200;
      if(htmlFile.includes(".css"))
      res.setHeader('Content-Type', 'text/css');
      else if(htmlFile.includes(".html"))
      res.setHeader('Content-Type', 'text/html');
      /*
      else if(htmlFile.includes(".jpg"))
      res.setHeader('Content-Type', 'text/jpg');
      else if(htmlFile.includes(".png"))
      res.setHeader('Content-Type', 'text/png');
      else if(htmlFile.includes(".js"))
      res.setHeader('Content-Type', 'text/javascript');
      */ 
      if(stats) {
         
          fs.createReadStream(htmlFile).pipe(res);
        
        } 

      });
  }   
 





}).listen(3000);