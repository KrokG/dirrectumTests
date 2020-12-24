//подготовка данных
let someoneFiller = {
  type: 'filler',
  message: '<p>text for filler</p>'
};

let someoneText = {
  type: 'text',
  name: 'nameSomeoneText',
  palaceholder: 'placeholeder text',
  required: true,
  validataionRules: {
    type: 'text'
  },
  value: 'text text',
  label: 'please fill input',
  class: 'stext',
  disabled: true
};
let someoneTextarea = {
  type: 'textarea',
  name: 'nametextarea',
  palaceholder: 'placeholeder text',
  required: true,
  validataionRules: {
    type: 'text'
  },
  value: 'textarea text',
  label: 'please fill textarea',
  class: 'textarea',
  disabled: true
}
let someoneCheckbox = {
  type: 'checkbox',
  checked: false,
  name: 'namecheckbox',
  palaceholder: 'placeholeder text',
  required: true,
  validataionRules: {
    type: 'radio'
  },
  value: 'text text',
  label: 'please fill input',
  class: 'checkbox',
  disabled: true
}
let someoneButton = {
  type: 'button',
  class: 'btn',
  text: 'sumbit'
}
let someoneSelect = {
  type: 'select',
  name: 'nameSomeoneText',
  palaceholder: 'placeholeder text',
  required: true,
  validataionRules: {
    type: 'text'
  },
  value: 'text text',
  label: 'please fill input',
  class: 'stext',
  disabled: true,
  options: [
    {
      value: '1',
      text: 'item 1',
      selected: false,
    }, {
      value: '2',
      text: 'item 2',
      selected: true,
    }, {
      value: '3',
      text: 'item 3',
      selected: false,
    }
  ]
}

let someoneRadio = {
  type: 'radio',
  items: [
    {
      value: '321',
      label: 'qwe',
      checked: false,
      name: 'nameSomeoneText',
      palaceholder: 'placeholeder text',
      required: true,
      validataionRules: {
        type: 'text'
      },
      value: 'text text',
      label: 'please fill input',
      class: 'stext',
      disabled: true
    }, {
      value: '123',
      label: 'ret',
      name: 'nameSomeoneText',
      palaceholder: 'placeholeder text',
      required: true,
      value: 'text text',
      label: 'please fill input',
      class: 'stext',
      disabled: true
    }
  ]
}
//подготовка данных конец

let obForm = {
  name: 'someone form',
  items: [someoneFiller, someoneText, someoneTextarea, someoneCheckbox, someoneButton, someoneSelect, someoneRadio],
  postmessage: null
};


let arr = JSON.stringify(obForm) // пример массива
console.log(arr)// вывод примера массива

// входные данные
let data = JSON.parse(arr)
let result = [];

// логика
result.push(`<form name="${data.name}">`);
data.items.map((item) => {
  pushElement(item);
});
result.push(`</form>`);
// в массиве  resultat лежит форма
let resultForm = result.join('\n')
console.log('==================')
console.log(resultForm) // <- результат строка с формой


//
function pushElement(element) {
  switch (element.type) {
    case 'filler': {
      result.push(element.message)
      break;
    }
    case 'text': {
      let attrs = getAllAttr(element);
      result.push(`<input type="text" ${attrs.join('')}></input>`);
      break;
    }
    case 'textarea': {
      let attrs = getAllAttr(element);
      result.push(`<textarea ${attrs.join('')}></textarea>`);
      break;
    }
    case 'checkbox': {
      let attrs = getAllAttr(element);
      result.push(`<input type="checkbox" ${attrs.join('')}></input>`);
      break;
    }
    case 'button': {
      result.push(`<button${getAttr(element, element.class)}>${element.text}</button>`)
      break;
    }
    case 'select': {
      result.push(`<select>`)
      element.options.map( function(item){
        let selected = item.selected  ? "selected" : '';
        result.push(`<option ${getAttr(item, item.value)} ${selected}>${item.text}</option>`);
      });
      result.push(`</select>`)
      break;
    }
    case 'radio': {
      element.items.map( function(item){
        let checked = item.checked  ? "checked" : '';
        result.push(`<input type="radio" ${getAllAttr(item).join('')}>${item.label}</input>`);
      });
      break;
    }
    default: {
      let tag = element.type;
      let attr
      result.push(`<${tag}></${tag}>`)
    }
  }
}

function getAllAttr(element){
  let attrs = [];
  attrs.push(getAttr(element, element.name));
  attrs.push(getAttr(element, element.palaceholder));
  attrs.push(getAttr(element, element.required));
  attrs.push(getAttr(element, element.value));
  attrs.push(getAttr(element, element.label));
  attrs.push(getAttr(element, element.class));
  attrs.push(getAttr(element, element.disabled));
  attrs.push(getAttr(element, element.checked));
  attrs.push(getAttr(element, element.value));
  attrs.push(getAttr(element, element.checked));
  //ruls
  let rules = element.validataionRules !== undefined ? ` validataionRules="${element.validataionRules.type}"` : '';
  attrs.push(rules);
  return attrs;
}

function getAttr(element, value) {
  return value !== '' && value !== undefined ? ` ${getPropName(element, value)}="${value}"` : '';
}

function getPropName(element, value) {
  for (prop in element) {
    if (element[prop] == value) {
      return prop;
    }
  }
  return '';
}
