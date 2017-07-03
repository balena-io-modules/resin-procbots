import { ATN } from 'antlr4ts/atn/ATN';
import { CharStream } from 'antlr4ts/CharStream';
import { Lexer } from 'antlr4ts/Lexer';
import { Vocabulary } from 'antlr4ts/Vocabulary';
export declare class RASPLexer extends Lexer {
    static readonly T__0: number;
    static readonly T__1: number;
    static readonly T__2: number;
    static readonly T__3: number;
    static readonly T__4: number;
    static readonly T__5: number;
    static readonly T__6: number;
    static readonly T__7: number;
    static readonly T__8: number;
    static readonly T__9: number;
    static readonly T__10: number;
    static readonly T__11: number;
    static readonly T__12: number;
    static readonly T__13: number;
    static readonly T__14: number;
    static readonly T__15: number;
    static readonly T__16: number;
    static readonly T__17: number;
    static readonly T__18: number;
    static readonly T__19: number;
    static readonly T__20: number;
    static readonly T__21: number;
    static readonly T__22: number;
    static readonly BOT: number;
    static readonly EVENT: number;
    static readonly EVENTS: number;
    static readonly RECEIVER: number;
    static readonly FROM: number;
    static readonly SEND: number;
    static readonly QUERIES: number;
    static readonly TO: number;
    static readonly SET: number;
    static readonly AS: number;
    static readonly IS: number;
    static readonly NOT: number;
    static readonly QUERY: number;
    static readonly METHOD: number;
    static readonly ERRORMETHOD: number;
    static readonly STRING: number;
    static readonly ESC: number;
    static readonly ID: number;
    static readonly BOOLEAN: number;
    static readonly NUMBER: number;
    static readonly FLOAT: number;
    static readonly INT: number;
    static readonly HEXNUMBER: number;
    static readonly COMMENT: number;
    static readonly LINE_COMMENT: number;
    static readonly WS: number;
    static readonly modeNames: string[];
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    readonly vocabulary: Vocabulary;
    constructor(input: CharStream);
    readonly grammarFileName: string;
    readonly ruleNames: string[];
    readonly serializedATN: string;
    readonly modeNames: string[];
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static readonly _ATN: ATN;
}
