export default function isJSONParsable(value:string){
  try{
    JSON.parse(value);
    return true;
  }
  catch(err){
    return false;
  }
}
