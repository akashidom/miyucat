export function randomItem(array) {
  try {
    const length = array.length;
    let index = Math.floor(Math.random() * length),
    item = array[index];
  
    return item;
  } catch(error) {
    console.error('>@>@>@>@>@ Error trying to randomize item in an array:', error);
    return undefined;
  } 
}

export const salutations = [
'hi',
'hi',
'hey',
'hey',
'hello',
'hello',
'wsup',
'greeting',
'salutation'
];

export const expressions = [
':3',
'^w^',
'0w0',
'—w—',
';3',
'=3',
'~(^•w•^)'
];