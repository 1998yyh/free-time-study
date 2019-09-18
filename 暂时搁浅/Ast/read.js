#!/usr/bin/env node
const recast = require('recast')
const TNT = recast.types.namedTypes

recast.run(function(ast, printSource) {
  recast.visit(ast, {
    visitExpressionStatement: function(path) {
      const node = path.value;
      // if(TNT.ExpressionStatement.check(node)){
      //   console.log('这是一个ExpressionStatement')
      // }
      TNT.ExpressionStatement.assert(node)
      this.traverse(path)
    }
  })
})
// recast.run( function(ast, printSource) {
//   recast.visit(ast, {
//     visitExpressionStatement: function({node}) {
//       // console.log(node)
//       printSource(node)
//       return false
//     }
//   })
// })