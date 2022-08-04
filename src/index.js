module.exports = function check(str, bracketsConfig) {
  let Mas = str.split('');
  let buffer = [];
  let IndexClose;
  let IndexOpen;
  let open = [];
  let close = [];
  let specialObj = {};

  for (let i = 0; i < bracketsConfig.length; i++) {
    open.push(bracketsConfig[i][0]);
    close.push(bracketsConfig[i][1]);
    if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
      specialObj[bracketsConfig[i][0]] = true;
    }
  }

  if (Mas.length%2 !== 0){
    return false
  }

  for (let i = 0; i < Mas.length; i++) {
    IndexOpen = open.indexOf(Mas[i]);

    if (open.indexOf(Mas[i]) !== close.indexOf(Mas[i])){   

      if (IndexOpen !== -1) {          
        buffer.push(IndexOpen);             
      } else {
        IndexClose = close.indexOf(Mas[i]);
        if (IndexClose !== -1) {
            IndexOpen = buffer.pop();
                 
          if (IndexClose !== IndexOpen) {
            return false;
          }
        }
      }     
      

    } else {
      if (IndexOpen !== -1 && specialObj[Mas[i]]) {          
        buffer.push(IndexOpen);
        specialObj[Mas[i]] = false;   
      } else {
        IndexClose = close.indexOf(Mas[i]);
        if (IndexClose !== -1 && !specialObj[Mas[i]]) {
            IndexOpen = buffer.pop();
          specialObj[Mas[i]] = true;    
          if (IndexClose !== IndexOpen) {
            return false;
          }
        }
      }            
    }
  }
  if (buffer.length !== 0) {
      return false;
  }

  return true;
}
