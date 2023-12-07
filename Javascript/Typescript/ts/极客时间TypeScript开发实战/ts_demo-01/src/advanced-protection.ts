// ------ 类型保护 ------
enum Type {Strong, Week}

class Java {
  helloJava() {
    console.log('Hello Java')
  }
  java: any
}

class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
  javascript: any
}

function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  // if (lang.helloJava){
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // instanceof
  if (lang instanceof Java){
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  // in
  // if ('java' in lang) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // typeof
  // if (typeof x === 'string'){
  //   x.toLowerCase()
  // } else {
  //   x.toFixed()
  // }

  // if(isJava(lang)){
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }
  return lang
}

getLanguage(Type.Strong,'12')