
function beforeToday(day){
  return day.isBefore(new Date(),"day");
}

function isToday(day){
  return day.isSame(new Date(),"day");
}

export default function dayStyles(day){

  if(beforeToday(day)){
    return "text-left before";
  }
  if(isToday(day)){
    return "text-left today";
  }

  return "text-left";
}
