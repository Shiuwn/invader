import typescript from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import htmlTemplate from 'rollup-plugin-generate-html-template'
export default {
  input:'./src/main.ts',
  output:{
    file:'./dist/main.js',
    format:'es'
  },
  plugins:[
    typescript(),
    htmlTemplate({
      template:'index.html',
      target:'dist/index.html'
    }),
    serve({port:3000,contentBase:'dist'}),
    livereload(),
  ]
}