/**
 *  Apply接收的是一个数组
 *  
 */

const injectSections = (items, sections) => {
  sections.forEach(
    (v, i) => {
      items[v.index] = [v.content, items[v.index]]
    }
  );
  console.log(items)
  return [].concat.apply([], items);
}

console.log(injectSections(['item1', 'item2', 'item3', 'item4', 'item5'], [{
    content: 'section1',
    index: 0
  },
  {
    content: 'section2',
    index: 2
  }
]))


/**
 *  但是这个  [ ].concat.apply([],items);
 *  !
 */