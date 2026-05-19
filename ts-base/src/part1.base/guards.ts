/**
 * 类型守卫：自定义 type predicate（lang is Java）收窄联合类型
 */
enum Type {
  Strong,
  Week,
}

class Java {
  helloJava() {
    console.log("Hello Java");
  }
  java: unknown;
}

class JavaScript {
  helloJavaScript() {
    console.log("Hello JavaScript");
  }
  js: unknown;
}

/** 类型谓词：返回 true 时，参数类型收窄为 Java */
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined;
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();

  if (isJava(lang)) {
    lang.helloJava(); // 此处 lang 为 Java
  } else {
    lang.helloJavaScript(); // 此处 lang 为 JavaScript
  }

  // 其他守卫方式（已注释）：
  // - 类型断言 as
  // - instanceof（仅类实例）
  // - in 操作符（检查属性）
  // - typeof（用于原始类型）

  return lang;
}

getLanguage(Type.Strong, 1);
