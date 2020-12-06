
function isHigh(value){
  return (value===3);
}

function isMedium(value){
  return (value===2);
}

export default function eventStyles(value){

  if(isHigh(value)){
    return "danger";
  }

  if(isMedium(value)){
    return "warning";
  }
  return "success";
}
