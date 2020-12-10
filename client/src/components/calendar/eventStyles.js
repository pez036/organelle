
function isHigh(value){
  return (value===3);
}

function isMedium(value){
  return (value===2);
}
function isNegative(value){
  return (value<0);
}

export default function eventStyles(value){

  if(isHigh(value)){
    return "danger";
  }

  if(isMedium(value)){
    return "warning";
  }
  if(isNegative(value)){
    return "secondary";
  }
  return "success";
}
