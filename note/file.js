const fs=require('fs')

//동기와 비동기
try{
  fs.renameSync('./text.txt','./text222.txt')
}catch(error){
    console.error(error)
}

fs.promises.readFile('./text222.txt','utf-8')
.then((data)=>{
    console.log(data)
    fs.promises.rename('./text222.txt','./text.txt')
    .then(console.log('promises rename'))
    .catch((error)=>console.error(error))
})
.catch(console.error)

