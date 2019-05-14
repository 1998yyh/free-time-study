const recast = require('recast')

const code = 
`function add(a, b) {
  return a + 
  // 有什么？
  b
}`

const ast = recast.parse(code)

const add = ast.program.body[0]


// console.log(add)
// console.log(add.params[0])
// console.log(add.body.body[0].argument.left)

const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders;

ast.program.body[0] = variableDeclaration('const',[
  variableDeclarator(add.id, functionExpression(
    null,
    add.params,
    add.body
  ))
])

// const output = recast.print(ast).code;

// recast.parse的逆向过程，具体公式为：
// recast.print(recast.parse(source)).code === source

const output = recast.prettyPrint(ast, { tabWidth: 2}).code

console.log(output)