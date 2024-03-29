export type Rule = {
    name?: string;
    type: string;
    code: string[];
};
export declare class Token {
    type: string;
    value: string;
    start: number;
    end: number;
    constructor(type: string, value: string, start: number, end: number);
}
export declare function lexer(input: string, rules: Rule[]): Token[];
