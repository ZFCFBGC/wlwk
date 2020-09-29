const zh=require('./en.js')
const fs=require('fs')
let result=JSON.stringify(zh.localization)
// result=JSON.parse(result)
console.log(result);
fs.writeFile('./en.json', result, 'utf-8', (err)=>{
  if(err)
    console.log(err);
  else
    console.log('ok');
})
