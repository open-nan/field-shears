// 定义词法规则
export type Rule = {
  name?: string;
  type: string;
  code: string[];
};

// Token
export class Token {
  type: string;
  value: string;
  start: number;
  end: number;
  constructor(type: string, value: string, start: number, end: number) {
    this.type = type;
    this.value = value;
    this.start = start;
    this.end = end;
  }
}

// 词法解析器 将代码解析为token
export function lexer(input: string, rules: Rule[]) {
  // 生成关键字map
  const keyMap: { [key: string]: string } = {};
  const keys: string[] = [];
  rules.forEach((rule: Rule) => {
    rule.code.forEach((code: string) => {
      keyMap[code] = rule.type;
      keys.push(code);
    });
  });

  // 生成tokens
  const tokens: Token[] = [];
  let i = 0,
    j = 0;
  while (i <= input.length) {
    let char = input[i], // 当前的字节
      str = input.slice(j, i); // 缓存的字段

    // 如果已经到了字符串的尾部结束循环
    if (i === input.length && str.length > 0) {
      tokens.push(new Token(keyMap[str] || "TEXT", str, j, i));
      break;
    }

    //判断是否命中了词法规则
    let hitRules = keys.filter((key) => {
      const hit = key[0] === char;
      if (!hit) return false;
      // 判断是否在字符串中，如果是则不处理
      if (
        (str[0] === "'" && input[i - 1] !== "'") ||
        (str[0] === '"' && input[i - 1] !== '"')
      ) {
        return false;
      } else {
        return true;
      }
    });
    if (hitRules.length === 0) {
      i = i + 1;
      continue;
    }

    // 如果命中了词法规则，将长度不等于0的str放入到tokens里
    if (str.length > 0) {
      tokens.push(new Token("TEXT", str, j, i));
      j = i;
    }

    // 对命中后的词法规则做处理
    /* eslint-disable no-constant-condition */
    while (true) {
      i = i + 1;
      str = input.slice(j, i);
      char = input[i];
      const rules = hitRules.filter((key) => {
        return key.includes(str + char);
      });
      // 如果 rules 的长度等于 0 证明超出了词法规则
      if (rules.length === 0 || i > input.length) {
        tokens.push(new Token(keyMap[str] || "TEXT", str, j, i));
        j = i;
        break;
      }
      hitRules = rules;
    }
  }

  return tokens;
}
