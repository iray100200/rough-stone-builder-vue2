module.exports = babel => {
  const t = babel.types

  return {
    name: 'babel-plugin-transform-vue-ignore-render-argument',
    visitor: {
      FunctionExpression(path) {
        if (path.node.id.name === 'render') {
          if (path.node.params.length > 0) {
            if (path.node.params[0].name === 'h') {
              return
            }
          }
          path.get('body').unshiftContainer('body', t.variableDeclaration('const', [
            t.variableDeclarator(
              t.identifier('h'),
              (
                t.memberExpression(
                  t.thisExpression(),
                  t.identifier('$createElement'))
              )
            )
          ]))
        }
        // path.replaceWith(transformJSXElement(t, path))
      }
    }
  }
}