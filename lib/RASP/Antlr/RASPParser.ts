// Generated from lib/RASP/Antlr/RASP.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
import { RuleVersion } from 'antlr4ts/RuleVersion';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { RASPListener } from './RASPListener';
import { RASPVisitor } from './RASPVisitor';


export class RASPParser extends Parser {
	public static readonly T__0=1;
	public static readonly T__1=2;
	public static readonly T__2=3;
	public static readonly T__3=4;
	public static readonly T__4=5;
	public static readonly T__5=6;
	public static readonly T__6=7;
	public static readonly T__7=8;
	public static readonly T__8=9;
	public static readonly T__9=10;
	public static readonly T__10=11;
	public static readonly T__11=12;
	public static readonly T__12=13;
	public static readonly T__13=14;
	public static readonly T__14=15;
	public static readonly T__15=16;
	public static readonly T__16=17;
	public static readonly T__17=18;
	public static readonly T__18=19;
	public static readonly T__19=20;
	public static readonly T__20=21;
	public static readonly T__21=22;
	public static readonly T__22=23;
	public static readonly BOT=24;
	public static readonly EVENT=25;
	public static readonly EVENTS=26;
	public static readonly RECEIVER=27;
	public static readonly RECEIVES=28;
	public static readonly FROM=29;
	public static readonly SEND=30;
	public static readonly QUERIES=31;
	public static readonly TO=32;
	public static readonly SET=33;
	public static readonly AS=34;
	public static readonly IS=35;
	public static readonly NOT=36;
	public static readonly QUERY=37;
	public static readonly METHOD=38;
	public static readonly ERRORMETHOD=39;
	public static readonly STRING=40;
	public static readonly ESC=41;
	public static readonly ID=42;
	public static readonly BOOLEAN=43;
	public static readonly NUMBER=44;
	public static readonly FLOAT=45;
	public static readonly INT=46;
	public static readonly HEXNUMBER=47;
	public static readonly COMMENT=48;
	public static readonly LINE_COMMENT=49;
	public static readonly WS=50;
	public static readonly RULE_init = 0;
	public static readonly RULE_botDefinition = 1;
	public static readonly RULE_botBody = 2;
	public static readonly RULE_addListener = 3;
	public static readonly RULE_addEmitter = 4;
	public static readonly RULE_requestServiceEvents = 5;
	public static readonly RULE_events = 6;
	public static readonly RULE_setServiceAs = 7;
	public static readonly RULE_setIdFrom = 8;
	public static readonly RULE_listenerMethod = 9;
	public static readonly RULE_listenerEventReceiver = 10;
	public static readonly RULE_listenerError = 11;
	public static readonly RULE_statement = 12;
	public static readonly RULE_expr = 13;
	public static readonly RULE_serviceName = 14;
	public static readonly RULE_variable = 15;
	public static readonly RULE_object = 16;
	public static readonly RULE_array = 17;
	public static readonly RULE_property = 18;
	public static readonly RULE_assignment = 19;
	public static readonly RULE_r_if = 20;
	public static readonly RULE_r_while = 21;
	public static readonly RULE_loop = 22;
	public static readonly RULE_print = 23;
	public static readonly RULE_end = 24;
	public static readonly RULE_sendQuery = 25;
	public static readonly RULE_method = 26;
	public static readonly RULE_methodList = 27;
	public static readonly RULE_stringMethod = 28;
	public static readonly RULE_envvar = 29;
	public static readonly ruleNames: string[] = [
		"init", "botDefinition", "botBody", "addListener", "addEmitter", "requestServiceEvents", 
		"events", "setServiceAs", "setIdFrom", "listenerMethod", "listenerEventReceiver", 
		"listenerError", "statement", "expr", "serviceName", "variable", "object", 
		"array", "property", "assignment", "r_if", "r_while", "loop", "print", 
		"end", "sendQuery", "method", "methodList", "stringMethod", "envvar"
	];

	private static readonly _LITERAL_NAMES: (string | undefined)[] = [
		undefined, "'('", "')'", "'['", "','", "']'", "'added'", "'subtracted'", 
		"'by'", "'multiplied'", "'divided'", "'and'", "'or'", "'.'", "'{'", "'}'", 
		"':'", "'if'", "'else'", "'while'", "'loop'", "'print'", "'end'", "'envar'", 
		"'bot'", "'event'", "'events'", "'receiver'", "'receives'", "'from'", 
		"'send'", "'queries'", "'to'", "'set'", "'as'", "'is'", "'not'", "'query'", 
		"'listenerMethod'", "'listenerErrorMethod'"
	];
	private static readonly _SYMBOLIC_NAMES: (string | undefined)[] = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "BOT", "EVENT", "EVENTS", "RECEIVER", 
		"RECEIVES", "FROM", "SEND", "QUERIES", "TO", "SET", "AS", "IS", "NOT", 
		"QUERY", "METHOD", "ERRORMETHOD", "STRING", "ESC", "ID", "BOOLEAN", "NUMBER", 
		"FLOAT", "INT", "HEXNUMBER", "COMMENT", "LINE_COMMENT", "WS"
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(RASPParser._LITERAL_NAMES, RASPParser._SYMBOLIC_NAMES, []);

	@Override
	@NotNull
	public get vocabulary(): Vocabulary {
		return RASPParser.VOCABULARY;
	}

	@Override
	public get grammarFileName(): string { return "RASP.g4"; }

	@Override
	public get ruleNames(): string[] { return RASPParser.ruleNames; }

	@Override
	public get serializedATN(): string { return RASPParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(RASPParser._ATN, this);
	}
	@RuleVersion(0)
	public init(): InitContext {
		let _localctx: InitContext = new InitContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, RASPParser.RULE_init);
		try {
			this.state = 62;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RASPParser.BOT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 60;
				this.botDefinition();
				}
				break;
			case RASPParser.EOF:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 61;
				this.match(RASPParser.EOF);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public botDefinition(): BotDefinitionContext {
		let _localctx: BotDefinitionContext = new BotDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, RASPParser.RULE_botDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 64;
			this.match(RASPParser.BOT);
			this.state = 65;
			this.match(RASPParser.T__0);
			this.state = 66;
			this.match(RASPParser.ID);
			this.state = 67;
			this.match(RASPParser.T__1);
			this.state = 71;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & ((1 << (RASPParser.EVENT - 25)) | (1 << (RASPParser.SEND - 25)) | (1 << (RASPParser.SET - 25)) | (1 << (RASPParser.METHOD - 25)) | (1 << (RASPParser.ERRORMETHOD - 25)) | (1 << (RASPParser.ID - 25)))) !== 0)) {
				{
				{
				this.state = 68;
				this.botBody();
				}
				}
				this.state = 73;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public botBody(): BotBodyContext {
		let _localctx: BotBodyContext = new BotBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, RASPParser.RULE_botBody);
		try {
			this.state = 81;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,2,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 74;
				this.addListener();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 75;
				this.addEmitter();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 76;
				this.requestServiceEvents();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 77;
				this.listenerMethod();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 78;
				this.listenerError();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 79;
				this.method();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 80;
				this.assignment();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public addListener(): AddListenerContext {
		let _localctx: AddListenerContext = new AddListenerContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, RASPParser.RULE_addListener);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 84;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===RASPParser.SET) {
				{
				this.state = 83;
				this.setServiceAs();
				}
			}

			this.state = 86;
			this.match(RASPParser.EVENT);
			this.state = 87;
			this.match(RASPParser.RECEIVER);
			this.state = 88;
			this.match(RASPParser.FROM);
			this.state = 89;
			this.serviceName();
			this.state = 92;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,4,this._ctx) ) {
			case 1:
				{
				this.state = 90;
				this.object();
				}
				break;

			case 2:
				{
				this.state = 91;
				this.variable();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public addEmitter(): AddEmitterContext {
		let _localctx: AddEmitterContext = new AddEmitterContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, RASPParser.RULE_addEmitter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 95;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===RASPParser.SET) {
				{
				this.state = 94;
				this.setServiceAs();
				}
			}

			this.state = 97;
			this.match(RASPParser.SEND);
			this.state = 98;
			this.match(RASPParser.QUERIES);
			this.state = 99;
			this.match(RASPParser.TO);
			this.state = 100;
			this.serviceName();
			this.state = 103;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,6,this._ctx) ) {
			case 1:
				{
				this.state = 101;
				this.object();
				}
				break;

			case 2:
				{
				this.state = 102;
				this.variable();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public requestServiceEvents(): RequestServiceEventsContext {
		let _localctx: RequestServiceEventsContext = new RequestServiceEventsContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, RASPParser.RULE_requestServiceEvents);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 105;
			this.match(RASPParser.SEND);
			this.state = 106;
			this.events();
			this.state = 107;
			this.match(RASPParser.EVENTS);
			this.state = 108;
			this.match(RASPParser.FROM);
			this.state = 109;
			this.serviceName();
			this.state = 110;
			this.match(RASPParser.TO);
			this.state = 111;
			this.match(RASPParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public events(): EventsContext {
		let _localctx: EventsContext = new EventsContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, RASPParser.RULE_events);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 113;
			this.match(RASPParser.T__2);
			this.state = 114;
			this.match(RASPParser.ID);
			this.state = 119;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===RASPParser.T__3) {
				{
				{
				this.state = 115;
				this.match(RASPParser.T__3);
				this.state = 116;
				this.match(RASPParser.ID);
				}
				}
				this.state = 121;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 122;
			this.match(RASPParser.T__4);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public setServiceAs(): SetServiceAsContext {
		let _localctx: SetServiceAsContext = new SetServiceAsContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, RASPParser.RULE_setServiceAs);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 124;
			this.match(RASPParser.SET);
			this.state = 125;
			this.match(RASPParser.ID);
			this.state = 126;
			this.match(RASPParser.AS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public setIdFrom(): SetIdFromContext {
		let _localctx: SetIdFromContext = new SetIdFromContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, RASPParser.RULE_setIdFrom);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 128;
			this.match(RASPParser.SET);
			this.state = 129;
			this.match(RASPParser.ID);
			this.state = 130;
			this.match(RASPParser.FROM);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public listenerMethod(): ListenerMethodContext {
		let _localctx: ListenerMethodContext = new ListenerMethodContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, RASPParser.RULE_listenerMethod);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this.match(RASPParser.METHOD);
			this.state = 133;
			this.match(RASPParser.ID);
			this.state = 143;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===RASPParser.RECEIVES) {
				{
				this.state = 134;
				this.match(RASPParser.RECEIVES);
				this.state = 135;
				this.listenerEventReceiver();
				this.state = 140;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===RASPParser.T__3) {
					{
					{
					this.state = 136;
					this.match(RASPParser.T__3);
					this.state = 137;
					this.listenerEventReceiver();
					}
					}
					this.state = 142;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 148;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,10,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					{
					{
					this.state = 145;
					this.statement();
					}
					} 
				}
				this.state = 150;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,10,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public listenerEventReceiver(): ListenerEventReceiverContext {
		let _localctx: ListenerEventReceiverContext = new ListenerEventReceiverContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, RASPParser.RULE_listenerEventReceiver);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 151;
			this.events();
			this.state = 152;
			this.match(RASPParser.FROM);
			this.state = 153;
			this.serviceName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public listenerError(): ListenerErrorContext {
		let _localctx: ListenerErrorContext = new ListenerErrorContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, RASPParser.RULE_listenerError);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 155;
			this.match(RASPParser.ERRORMETHOD);
			this.state = 156;
			this.match(RASPParser.ID);
			this.state = 160;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,11,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					{
					{
					this.state = 157;
					this.statement();
					}
					} 
				}
				this.state = 162;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,11,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, RASPParser.RULE_statement);
		try {
			this.state = 171;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,12,this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 163;
				this.method();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 164;
				this.assignment();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 165;
				this.r_if();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 166;
				this.r_while();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 167;
				this.loop();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 168;
				this.print();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 169;
				this.sendQuery();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 170;
				this.end();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	@RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 26;
		this.enterRecursionRule(_localctx, 26, RASPParser.RULE_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 182;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input,13,this._ctx) ) {
			case 1:
				{
				this.state = 174;
				this.array();
				}
				break;

			case 2:
				{
				this.state = 175;
				this.method();
				}
				break;

			case 3:
				{
				this.state = 176;
				this.stringMethod();
				}
				break;

			case 4:
				{
				this.state = 177;
				this.variable();
				}
				break;

			case 5:
				{
				this.state = 178;
				this.object();
				}
				break;

			case 6:
				{
				this.state = 179;
				this.match(RASPParser.NUMBER);
				}
				break;

			case 7:
				{
				this.state = 180;
				this.match(RASPParser.STRING);
				}
				break;

			case 8:
				{
				this.state = 181;
				this.match(RASPParser.BOOLEAN);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 215;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,15,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					if ( this._parseListeners!=null ) this.triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					this.state = 213;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input,14,this._ctx) ) {
					case 1:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, RASPParser.RULE_expr);
						this.state = 184;
						if (!(this.precpred(this._ctx, 16))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 16)");
						this.state = 185;
						this.match(RASPParser.T__5);
						this.state = 186;
						this.match(RASPParser.TO);
						this.state = 187;
						this.expr(17);
						}
						break;

					case 2:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, RASPParser.RULE_expr);
						this.state = 188;
						if (!(this.precpred(this._ctx, 15))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 15)");
						this.state = 189;
						this.match(RASPParser.T__6);
						this.state = 190;
						this.match(RASPParser.T__7);
						this.state = 191;
						this.expr(16);
						}
						break;

					case 3:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, RASPParser.RULE_expr);
						this.state = 192;
						if (!(this.precpred(this._ctx, 14))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 14)");
						this.state = 193;
						this.match(RASPParser.T__8);
						this.state = 194;
						this.match(RASPParser.T__7);
						this.state = 195;
						this.expr(15);
						}
						break;

					case 4:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, RASPParser.RULE_expr);
						this.state = 196;
						if (!(this.precpred(this._ctx, 13))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 13)");
						this.state = 197;
						this.match(RASPParser.T__9);
						this.state = 198;
						this.match(RASPParser.T__7);
						this.state = 199;
						this.expr(14);
						}
						break;

					case 5:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, RASPParser.RULE_expr);
						this.state = 200;
						if (!(this.precpred(this._ctx, 12))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 12)");
						this.state = 201;
						this.match(RASPParser.T__10);
						this.state = 202;
						this.expr(13);
						}
						break;

					case 6:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, RASPParser.RULE_expr);
						this.state = 203;
						if (!(this.precpred(this._ctx, 11))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 11)");
						this.state = 204;
						this.match(RASPParser.T__11);
						this.state = 205;
						this.expr(12);
						}
						break;

					case 7:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, RASPParser.RULE_expr);
						this.state = 206;
						if (!(this.precpred(this._ctx, 10))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 10)");
						this.state = 207;
						this.match(RASPParser.IS);
						this.state = 208;
						this.expr(11);
						}
						break;

					case 8:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, RASPParser.RULE_expr);
						this.state = 209;
						if (!(this.precpred(this._ctx, 9))) throw new FailedPredicateException(this, "this.precpred(this._ctx, 9)");
						this.state = 210;
						this.match(RASPParser.IS);
						this.state = 211;
						this.match(RASPParser.NOT);
						this.state = 212;
						this.expr(10);
						}
						break;
					}
					} 
				}
				this.state = 217;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,15,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	@RuleVersion(0)
	public serviceName(): ServiceNameContext {
		let _localctx: ServiceNameContext = new ServiceNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, RASPParser.RULE_serviceName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 218;
			this.match(RASPParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public variable(): VariableContext {
		let _localctx: VariableContext = new VariableContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, RASPParser.RULE_variable);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 220;
			this.match(RASPParser.ID);
			this.state = 225;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,16,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					{
					{
					this.state = 221;
					this.match(RASPParser.T__12);
					this.state = 222;
					this.match(RASPParser.ID);
					}
					} 
				}
				this.state = 227;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,16,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public object(): ObjectContext {
		let _localctx: ObjectContext = new ObjectContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, RASPParser.RULE_object);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 228;
			this.match(RASPParser.T__13);
			this.state = 229;
			this.property();
			this.state = 234;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===RASPParser.T__3) {
				{
				{
				this.state = 230;
				this.match(RASPParser.T__3);
				this.state = 231;
				this.property();
				}
				}
				this.state = 236;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 237;
			this.match(RASPParser.T__14);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public array(): ArrayContext {
		let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, RASPParser.RULE_array);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 242;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===RASPParser.ID) {
				{
				{
				this.state = 239;
				this.match(RASPParser.ID);
				}
				}
				this.state = 244;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 245;
			this.match(RASPParser.T__2);
			this.state = 246;
			this.expr(0);
			this.state = 251;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===RASPParser.T__3) {
				{
				{
				this.state = 247;
				this.match(RASPParser.T__3);
				this.state = 248;
				this.expr(0);
				}
				}
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 254;
			this.match(RASPParser.T__4);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public property(): PropertyContext {
		let _localctx: PropertyContext = new PropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, RASPParser.RULE_property);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 256;
			this.match(RASPParser.ID);
			this.state = 261;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===RASPParser.T__15) {
				{
				{
				this.state = 257;
				this.match(RASPParser.T__15);
				this.state = 258;
				this.expr(0);
				}
				}
				this.state = 263;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public assignment(): AssignmentContext {
		let _localctx: AssignmentContext = new AssignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, RASPParser.RULE_assignment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 264;
			this.match(RASPParser.SET);
			this.state = 265;
			this.variable();
			this.state = 266;
			this.match(RASPParser.AS);
			this.state = 267;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public r_if(): R_ifContext {
		let _localctx: R_ifContext = new R_ifContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, RASPParser.RULE_r_if);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 269;
			this.match(RASPParser.T__16);
			this.state = 270;
			this.expr(0);
			this.state = 271;
			this.statement();
			this.state = 276;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input,21,this._ctx);
			while ( _alt!==2 && _alt!==ATN.INVALID_ALT_NUMBER ) {
				if ( _alt===1 ) {
					{
					{
					this.state = 272;
					this.match(RASPParser.T__17);
					this.state = 273;
					this.statement();
					}
					} 
				}
				this.state = 278;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input,21,this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public r_while(): R_whileContext {
		let _localctx: R_whileContext = new R_whileContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, RASPParser.RULE_r_while);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 279;
			this.match(RASPParser.T__18);
			this.state = 280;
			this.expr(0);
			this.state = 281;
			this.statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public loop(): LoopContext {
		let _localctx: LoopContext = new LoopContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, RASPParser.RULE_loop);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 283;
			this.match(RASPParser.T__19);
			this.state = 284;
			this.match(RASPParser.FROM);
			this.state = 285;
			this.expr(0);
			this.state = 286;
			this.match(RASPParser.TO);
			this.state = 287;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public print(): PrintContext {
		let _localctx: PrintContext = new PrintContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, RASPParser.RULE_print);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 289;
			this.match(RASPParser.T__20);
			this.state = 290;
			this.expr(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public end(): EndContext {
		let _localctx: EndContext = new EndContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, RASPParser.RULE_end);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 292;
			this.match(RASPParser.T__21);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public sendQuery(): SendQueryContext {
		let _localctx: SendQueryContext = new SendQueryContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, RASPParser.RULE_sendQuery);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===RASPParser.SET) {
				{
				this.state = 294;
				this.setIdFrom();
				}
			}

			this.state = 297;
			this.match(RASPParser.QUERY);
			this.state = 301;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===RASPParser.ID) {
				{
				{
				this.state = 298;
				this.match(RASPParser.ID);
				}
				}
				this.state = 303;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 304;
			this.object();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public method(): MethodContext {
		let _localctx: MethodContext = new MethodContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, RASPParser.RULE_method);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 306;
			this.variable();
			this.state = 307;
			this.match(RASPParser.T__0);
			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===RASPParser.T__2 || _la===RASPParser.T__13 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (RASPParser.STRING - 40)) | (1 << (RASPParser.ID - 40)) | (1 << (RASPParser.BOOLEAN - 40)) | (1 << (RASPParser.NUMBER - 40)))) !== 0)) {
				{
				{
				this.state = 308;
				this.methodList();
				}
				}
				this.state = 313;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 314;
			this.match(RASPParser.T__1);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public methodList(): MethodListContext {
		let _localctx: MethodListContext = new MethodListContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, RASPParser.RULE_methodList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 316;
			this.expr(0);
			this.state = 321;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===RASPParser.T__3) {
				{
				{
				this.state = 317;
				this.match(RASPParser.T__3);
				this.state = 318;
				this.expr(0);
				}
				}
				this.state = 323;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public stringMethod(): StringMethodContext {
		let _localctx: StringMethodContext = new StringMethodContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, RASPParser.RULE_stringMethod);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 324;
			this.match(RASPParser.STRING);
			this.state = 325;
			this.match(RASPParser.T__12);
			this.state = 326;
			this.method();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	@RuleVersion(0)
	public envvar(): EnvvarContext {
		let _localctx: EnvvarContext = new EnvvarContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, RASPParser.RULE_envvar);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 328;
			this.match(RASPParser.T__22);
			this.state = 329;
			this.match(RASPParser.ID);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 13:
			return this.expr_sempred(_localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 16);

		case 1:
			return this.precpred(this._ctx, 15);

		case 2:
			return this.precpred(this._ctx, 14);

		case 3:
			return this.precpred(this._ctx, 13);

		case 4:
			return this.precpred(this._ctx, 12);

		case 5:
			return this.precpred(this._ctx, 11);

		case 6:
			return this.precpred(this._ctx, 10);

		case 7:
			return this.precpred(this._ctx, 9);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x034\u014E\x04\x02"+
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07"+
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04"+
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04"+
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04"+
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04"+
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x03\x02\x03\x02\x05\x02A\n\x02"+
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03H\n\x03\f\x03\x0E\x03"+
		"K\v\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04"+
		"T\n\x04\x03\x05\x05\x05W\n\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05"+
		"\x03\x05\x05\x05_\n\x05\x03\x06\x05\x06b\n\x06\x03\x06\x03\x06\x03\x06"+
		"\x03\x06\x03\x06\x03\x06\x05\x06j\n\x06\x03\x07\x03\x07\x03\x07\x03\x07"+
		"\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x07\bx\n\b\f"+
		"\b\x0E\b{\v\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03"+
		"\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x07\v\x8D\n\v\f\v\x0E\v\x90\v\v"+
		"\x05\v\x92\n\v\x03\v\x07\v\x95\n\v\f\v\x0E\v\x98\v\v\x03\f\x03\f\x03\f"+
		"\x03\f\x03\r\x03\r\x03\r\x07\r\xA1\n\r\f\r\x0E\r\xA4\v\r\x03\x0E\x03\x0E"+
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xAE\n\x0E\x03"+
		"\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05"+
		"\x0F\xB9\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F"+
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F"+
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F"+
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\xD8\n\x0F\f\x0F\x0E\x0F\xDB\v"+
		"\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x07\x11\xE2\n\x11\f\x11\x0E"+
		"\x11\xE5\v\x11\x03\x12\x03\x12\x03\x12\x03\x12\x07\x12\xEB\n\x12\f\x12"+
		"\x0E\x12\xEE\v\x12\x03\x12\x03\x12\x03\x13\x07\x13\xF3\n\x13\f\x13\x0E"+
		"\x13\xF6\v\x13\x03\x13\x03\x13\x03\x13\x03\x13\x07\x13\xFC\n\x13\f\x13"+
		"\x0E\x13\xFF\v\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x07\x14\u0106"+
		"\n\x14\f\x14\x0E\x14\u0109\v\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15"+
		"\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16\u0115\n\x16\f\x16\x0E"+
		"\x16\u0118\v\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x18\x03\x18\x03\x18"+
		"\x03\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1B"+
		"\x05\x1B\u012A\n\x1B\x03\x1B\x03\x1B\x07\x1B\u012E\n\x1B\f\x1B\x0E\x1B"+
		"\u0131\v\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x07\x1C\u0138\n\x1C"+
		"\f\x1C\x0E\x1C\u013B\v\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x07"+
		"\x1D\u0142\n\x1D\f\x1D\x0E\x1D\u0145\v\x1D\x03\x1E\x03\x1E\x03\x1E\x03"+
		"\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x02\x02\x03\x1C \x02\x02\x04\x02"+
		"\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18"+
		"\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x02"+
		"0\x022\x024\x026\x028\x02:\x02<\x02\x02\x02\u0162\x02@\x03\x02\x02\x02"+
		"\x04B\x03\x02\x02\x02\x06S\x03\x02\x02\x02\bV\x03\x02\x02\x02\na\x03\x02"+
		"\x02\x02\fk\x03\x02\x02\x02\x0Es\x03\x02\x02\x02\x10~\x03\x02\x02\x02"+
		"\x12\x82\x03\x02\x02\x02\x14\x86\x03\x02\x02\x02\x16\x99\x03\x02\x02\x02"+
		"\x18\x9D\x03\x02\x02\x02\x1A\xAD\x03\x02\x02\x02\x1C\xB8\x03\x02\x02\x02"+
		"\x1E\xDC\x03\x02\x02\x02 \xDE\x03\x02\x02\x02\"\xE6\x03\x02\x02\x02$\xF4"+
		"\x03\x02\x02\x02&\u0102\x03\x02\x02\x02(\u010A\x03\x02\x02\x02*\u010F"+
		"\x03\x02\x02\x02,\u0119\x03\x02\x02\x02.\u011D\x03\x02\x02\x020\u0123"+
		"\x03\x02\x02\x022\u0126\x03\x02\x02\x024\u0129\x03\x02\x02\x026\u0134"+
		"\x03\x02\x02\x028\u013E\x03\x02\x02\x02:\u0146\x03\x02\x02\x02<\u014A"+
		"\x03\x02\x02\x02>A\x05\x04\x03\x02?A\x07\x02\x02\x03@>\x03\x02\x02\x02"+
		"@?\x03\x02\x02\x02A\x03\x03\x02\x02\x02BC\x07\x1A\x02\x02CD\x07\x03\x02"+
		"\x02DE\x07,\x02\x02EI\x07\x04\x02\x02FH\x05\x06\x04\x02GF\x03\x02\x02"+
		"\x02HK\x03\x02\x02\x02IG\x03\x02\x02\x02IJ\x03\x02\x02\x02J\x05\x03\x02"+
		"\x02\x02KI\x03\x02\x02\x02LT\x05\b\x05\x02MT\x05\n\x06\x02NT\x05\f\x07"+
		"\x02OT\x05\x14\v\x02PT\x05\x18\r\x02QT\x056\x1C\x02RT\x05(\x15\x02SL\x03"+
		"\x02\x02\x02SM\x03\x02\x02\x02SN\x03\x02\x02\x02SO\x03\x02\x02\x02SP\x03"+
		"\x02\x02\x02SQ\x03\x02\x02\x02SR\x03\x02\x02\x02T\x07\x03\x02\x02\x02"+
		"UW\x05\x10\t\x02VU\x03\x02\x02\x02VW\x03\x02\x02\x02WX\x03\x02\x02\x02"+
		"XY\x07\x1B\x02\x02YZ\x07\x1D\x02\x02Z[\x07\x1F\x02\x02[^\x05\x1E\x10\x02"+
		"\\_\x05\"\x12\x02]_\x05 \x11\x02^\\\x03\x02\x02\x02^]\x03\x02\x02\x02"+
		"^_\x03\x02\x02\x02_\t\x03\x02\x02\x02`b\x05\x10\t\x02a`\x03\x02\x02\x02"+
		"ab\x03\x02\x02\x02bc\x03\x02\x02\x02cd\x07 \x02\x02de\x07!\x02\x02ef\x07"+
		"\"\x02\x02fi\x05\x1E\x10\x02gj\x05\"\x12\x02hj\x05 \x11\x02ig\x03\x02"+
		"\x02\x02ih\x03\x02\x02\x02ij\x03\x02\x02\x02j\v\x03\x02\x02\x02kl\x07"+
		" \x02\x02lm\x05\x0E\b\x02mn\x07\x1C\x02\x02no\x07\x1F\x02\x02op\x05\x1E"+
		"\x10\x02pq\x07\"\x02\x02qr\x07,\x02\x02r\r\x03\x02\x02\x02st\x07\x05\x02"+
		"\x02ty\x07,\x02\x02uv\x07\x06\x02\x02vx\x07,\x02\x02wu\x03\x02\x02\x02"+
		"x{\x03\x02\x02\x02yw\x03\x02\x02\x02yz\x03\x02\x02\x02z|\x03\x02\x02\x02"+
		"{y\x03\x02\x02\x02|}\x07\x07\x02\x02}\x0F\x03\x02\x02\x02~\x7F\x07#\x02"+
		"\x02\x7F\x80\x07,\x02\x02\x80\x81\x07$\x02\x02\x81\x11\x03\x02\x02\x02"+
		"\x82\x83\x07#\x02\x02\x83\x84\x07,\x02\x02\x84\x85\x07\x1F\x02\x02\x85"+
		"\x13\x03\x02\x02\x02\x86\x87\x07(\x02\x02\x87\x91\x07,\x02\x02\x88\x89"+
		"\x07\x1E\x02\x02\x89\x8E\x05\x16\f\x02\x8A\x8B\x07\x06\x02\x02\x8B\x8D"+
		"\x05\x16\f\x02\x8C\x8A\x03\x02\x02\x02\x8D\x90\x03\x02\x02\x02\x8E\x8C"+
		"\x03\x02\x02\x02\x8E\x8F\x03\x02\x02\x02\x8F\x92\x03\x02\x02\x02\x90\x8E"+
		"\x03\x02\x02\x02\x91\x88\x03\x02\x02\x02\x91\x92\x03\x02\x02\x02\x92\x96"+
		"\x03\x02\x02\x02\x93\x95\x05\x1A\x0E\x02\x94\x93\x03\x02\x02\x02\x95\x98"+
		"\x03\x02\x02\x02\x96\x94\x03\x02\x02\x02\x96\x97\x03\x02\x02\x02\x97\x15"+
		"\x03\x02\x02\x02\x98\x96\x03\x02\x02\x02\x99\x9A\x05\x0E\b\x02\x9A\x9B"+
		"\x07\x1F\x02\x02\x9B\x9C\x05\x1E\x10\x02\x9C\x17\x03\x02\x02\x02\x9D\x9E"+
		"\x07)\x02\x02\x9E\xA2\x07,\x02\x02\x9F\xA1\x05\x1A\x0E\x02\xA0\x9F\x03"+
		"\x02\x02\x02\xA1\xA4\x03\x02\x02\x02\xA2\xA0\x03\x02\x02\x02\xA2\xA3\x03"+
		"\x02\x02\x02\xA3\x19\x03\x02\x02\x02\xA4\xA2\x03\x02\x02\x02\xA5\xAE\x05"+
		"6\x1C\x02\xA6\xAE\x05(\x15\x02\xA7\xAE\x05*\x16\x02\xA8\xAE\x05,\x17\x02"+
		"\xA9\xAE\x05.\x18\x02\xAA\xAE\x050\x19\x02\xAB\xAE\x054\x1B\x02\xAC\xAE"+
		"\x052\x1A\x02\xAD\xA5\x03\x02\x02\x02\xAD\xA6\x03\x02\x02\x02\xAD\xA7"+
		"\x03\x02\x02\x02\xAD\xA8\x03\x02\x02\x02\xAD\xA9\x03\x02\x02\x02\xAD\xAA"+
		"\x03\x02\x02\x02\xAD\xAB\x03\x02\x02\x02\xAD\xAC\x03\x02\x02\x02\xAE\x1B"+
		"\x03\x02\x02\x02\xAF\xB0\b\x0F\x01\x02\xB0\xB9\x05$\x13\x02\xB1\xB9\x05"+
		"6\x1C\x02\xB2\xB9\x05:\x1E\x02\xB3\xB9\x05 \x11\x02\xB4\xB9\x05\"\x12"+
		"\x02\xB5\xB9\x07.\x02\x02\xB6\xB9\x07*\x02\x02\xB7\xB9\x07-\x02\x02\xB8"+
		"\xAF\x03\x02\x02\x02\xB8\xB1\x03\x02\x02\x02\xB8\xB2\x03\x02\x02\x02\xB8"+
		"\xB3\x03\x02\x02\x02\xB8\xB4\x03\x02\x02\x02\xB8\xB5\x03\x02\x02\x02\xB8"+
		"\xB6\x03\x02\x02\x02\xB8\xB7\x03\x02\x02\x02\xB9\xD9\x03\x02\x02\x02\xBA"+
		"\xBB\f\x12\x02\x02\xBB\xBC\x07\b\x02\x02\xBC\xBD\x07\"\x02\x02\xBD\xD8"+
		"\x05\x1C\x0F\x13\xBE\xBF\f\x11\x02\x02\xBF\xC0\x07\t\x02\x02\xC0\xC1\x07"+
		"\n\x02\x02\xC1\xD8\x05\x1C\x0F\x12\xC2\xC3\f\x10\x02\x02\xC3\xC4\x07\v"+
		"\x02\x02\xC4\xC5\x07\n\x02\x02\xC5\xD8\x05\x1C\x0F\x11\xC6\xC7\f\x0F\x02"+
		"\x02\xC7\xC8\x07\f\x02\x02\xC8\xC9\x07\n\x02\x02\xC9\xD8\x05\x1C\x0F\x10"+
		"\xCA\xCB\f\x0E\x02\x02\xCB\xCC\x07\r\x02\x02\xCC\xD8\x05\x1C\x0F\x0F\xCD"+
		"\xCE\f\r\x02\x02\xCE\xCF\x07\x0E\x02\x02\xCF\xD8\x05\x1C\x0F\x0E\xD0\xD1"+
		"\f\f\x02\x02\xD1\xD2\x07%\x02\x02\xD2\xD8\x05\x1C\x0F\r\xD3\xD4\f\v\x02"+
		"\x02\xD4\xD5\x07%\x02\x02\xD5\xD6\x07&\x02\x02\xD6\xD8\x05\x1C\x0F\f\xD7"+
		"\xBA\x03\x02\x02\x02\xD7\xBE\x03\x02\x02\x02\xD7\xC2\x03\x02\x02\x02\xD7"+
		"\xC6\x03\x02\x02\x02\xD7\xCA\x03\x02\x02\x02\xD7\xCD\x03\x02\x02\x02\xD7"+
		"\xD0\x03\x02\x02\x02\xD7\xD3\x03\x02\x02\x02\xD8\xDB\x03\x02\x02\x02\xD9"+
		"\xD7\x03\x02\x02\x02\xD9\xDA\x03\x02\x02\x02\xDA\x1D\x03\x02\x02\x02\xDB"+
		"\xD9\x03\x02\x02\x02\xDC\xDD\x07,\x02\x02\xDD\x1F\x03\x02\x02\x02\xDE"+
		"\xE3\x07,\x02\x02\xDF\xE0\x07\x0F\x02\x02\xE0\xE2\x07,\x02\x02\xE1\xDF"+
		"\x03\x02\x02\x02\xE2\xE5\x03\x02\x02\x02\xE3\xE1\x03\x02\x02\x02\xE3\xE4"+
		"\x03\x02\x02\x02\xE4!\x03\x02\x02\x02\xE5\xE3\x03\x02\x02\x02\xE6\xE7"+
		"\x07\x10\x02\x02\xE7\xEC\x05&\x14\x02\xE8\xE9\x07\x06\x02\x02\xE9\xEB"+
		"\x05&\x14\x02\xEA\xE8\x03\x02\x02\x02\xEB\xEE\x03\x02\x02\x02\xEC\xEA"+
		"\x03\x02\x02\x02\xEC\xED\x03\x02\x02\x02\xED\xEF\x03\x02\x02\x02\xEE\xEC"+
		"\x03\x02\x02\x02\xEF\xF0\x07\x11\x02\x02\xF0#\x03\x02\x02\x02\xF1\xF3"+
		"\x07,\x02\x02\xF2\xF1\x03\x02\x02\x02\xF3\xF6\x03\x02\x02\x02\xF4\xF2"+
		"\x03\x02\x02\x02\xF4\xF5\x03\x02\x02\x02\xF5\xF7\x03\x02\x02\x02\xF6\xF4"+
		"\x03\x02\x02\x02\xF7\xF8\x07\x05\x02\x02\xF8\xFD\x05\x1C\x0F\x02\xF9\xFA"+
		"\x07\x06\x02\x02\xFA\xFC\x05\x1C\x0F\x02\xFB\xF9\x03\x02\x02\x02\xFC\xFF"+
		"\x03\x02\x02\x02\xFD\xFB\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\u0100"+
		"\x03\x02\x02\x02\xFF\xFD\x03\x02\x02\x02\u0100\u0101\x07\x07\x02\x02\u0101"+
		"%\x03\x02\x02\x02\u0102\u0107\x07,\x02\x02\u0103\u0104\x07\x12\x02\x02"+
		"\u0104\u0106\x05\x1C\x0F\x02\u0105\u0103\x03\x02\x02\x02\u0106\u0109\x03"+
		"\x02\x02\x02\u0107\u0105\x03\x02\x02\x02\u0107\u0108\x03\x02\x02\x02\u0108"+
		"\'\x03\x02\x02\x02\u0109\u0107\x03\x02\x02\x02\u010A\u010B\x07#\x02\x02"+
		"\u010B\u010C\x05 \x11\x02\u010C\u010D\x07$\x02\x02\u010D\u010E\x05\x1C"+
		"\x0F\x02\u010E)\x03\x02\x02\x02\u010F\u0110\x07\x13\x02\x02\u0110\u0111"+
		"\x05\x1C\x0F\x02\u0111\u0116\x05\x1A\x0E\x02\u0112\u0113\x07\x14\x02\x02"+
		"\u0113\u0115\x05\x1A\x0E\x02\u0114\u0112\x03\x02\x02\x02\u0115\u0118\x03"+
		"\x02\x02\x02\u0116\u0114\x03\x02\x02\x02\u0116\u0117\x03\x02\x02\x02\u0117"+
		"+\x03\x02\x02\x02\u0118\u0116\x03\x02\x02\x02\u0119\u011A\x07\x15\x02"+
		"\x02\u011A\u011B\x05\x1C\x0F\x02\u011B\u011C\x05\x1A\x0E\x02\u011C-\x03"+
		"\x02\x02\x02\u011D\u011E\x07\x16\x02\x02\u011E\u011F\x07\x1F\x02\x02\u011F"+
		"\u0120\x05\x1C\x0F\x02\u0120\u0121\x07\"\x02\x02\u0121\u0122\x05\x1C\x0F"+
		"\x02\u0122/\x03\x02\x02\x02\u0123\u0124\x07\x17\x02\x02\u0124\u0125\x05"+
		"\x1C\x0F\x02\u01251\x03\x02\x02\x02\u0126\u0127\x07\x18\x02\x02\u0127"+
		"3\x03\x02\x02\x02\u0128\u012A\x05\x12\n\x02\u0129\u0128\x03\x02\x02\x02"+
		"\u0129\u012A\x03\x02\x02\x02\u012A\u012B\x03\x02\x02\x02\u012B\u012F\x07"+
		"\'\x02\x02\u012C\u012E\x07,\x02\x02\u012D\u012C\x03\x02\x02\x02\u012E"+
		"\u0131\x03\x02\x02\x02\u012F\u012D\x03\x02\x02\x02\u012F\u0130\x03\x02"+
		"\x02\x02\u0130\u0132\x03\x02\x02\x02\u0131\u012F\x03\x02\x02\x02\u0132"+
		"\u0133\x05\"\x12\x02\u01335\x03\x02\x02\x02\u0134\u0135\x05 \x11\x02\u0135"+
		"\u0139\x07\x03\x02\x02\u0136\u0138\x058\x1D\x02\u0137\u0136\x03\x02\x02"+
		"\x02\u0138\u013B\x03\x02\x02\x02\u0139\u0137\x03\x02\x02\x02\u0139\u013A"+
		"\x03\x02\x02\x02\u013A\u013C\x03\x02\x02\x02\u013B\u0139\x03\x02\x02\x02"+
		"\u013C\u013D\x07\x04\x02\x02\u013D7\x03\x02\x02\x02\u013E\u0143\x05\x1C"+
		"\x0F\x02\u013F\u0140\x07\x06\x02\x02\u0140\u0142\x05\x1C\x0F\x02\u0141"+
		"\u013F\x03\x02\x02\x02\u0142\u0145\x03\x02\x02\x02\u0143\u0141\x03\x02"+
		"\x02\x02\u0143\u0144\x03\x02\x02\x02\u01449\x03\x02\x02\x02\u0145\u0143"+
		"\x03\x02\x02\x02\u0146\u0147\x07*\x02\x02\u0147\u0148\x07\x0F\x02\x02"+
		"\u0148\u0149\x056\x1C\x02\u0149;\x03\x02\x02\x02\u014A\u014B\x07\x19\x02"+
		"\x02\u014B\u014C\x07,\x02\x02\u014C=\x03\x02\x02\x02\x1C@ISV^aiy\x8E\x91"+
		"\x96\xA2\xAD\xB8\xD7\xD9\xE3\xEC\xF4\xFD\u0107\u0116\u0129\u012F\u0139"+
		"\u0143";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!RASPParser.__ATN) {
			RASPParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RASPParser._serializedATN));
		}

		return RASPParser.__ATN;
	}

}

export class InitContext extends ParserRuleContext {
	public botDefinition(): BotDefinitionContext | undefined {
		return this.tryGetRuleContext(0, BotDefinitionContext);
	}
	public EOF(): TerminalNode | undefined { return this.tryGetToken(RASPParser.EOF, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_init; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterInit) listener.enterInit(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitInit) listener.exitInit(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitInit) return visitor.visitInit(this);
		else return visitor.visitChildren(this);
	}
}


export class BotDefinitionContext extends ParserRuleContext {
	public BOT(): TerminalNode { return this.getToken(RASPParser.BOT, 0); }
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	public botBody(): BotBodyContext[];
	public botBody(i: number): BotBodyContext;
	public botBody(i?: number): BotBodyContext | BotBodyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BotBodyContext);
		} else {
			return this.getRuleContext(i, BotBodyContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_botDefinition; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterBotDefinition) listener.enterBotDefinition(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitBotDefinition) listener.exitBotDefinition(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitBotDefinition) return visitor.visitBotDefinition(this);
		else return visitor.visitChildren(this);
	}
}


export class BotBodyContext extends ParserRuleContext {
	public addListener(): AddListenerContext | undefined {
		return this.tryGetRuleContext(0, AddListenerContext);
	}
	public addEmitter(): AddEmitterContext | undefined {
		return this.tryGetRuleContext(0, AddEmitterContext);
	}
	public requestServiceEvents(): RequestServiceEventsContext | undefined {
		return this.tryGetRuleContext(0, RequestServiceEventsContext);
	}
	public listenerMethod(): ListenerMethodContext | undefined {
		return this.tryGetRuleContext(0, ListenerMethodContext);
	}
	public listenerError(): ListenerErrorContext | undefined {
		return this.tryGetRuleContext(0, ListenerErrorContext);
	}
	public method(): MethodContext | undefined {
		return this.tryGetRuleContext(0, MethodContext);
	}
	public assignment(): AssignmentContext | undefined {
		return this.tryGetRuleContext(0, AssignmentContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_botBody; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterBotBody) listener.enterBotBody(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitBotBody) listener.exitBotBody(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitBotBody) return visitor.visitBotBody(this);
		else return visitor.visitChildren(this);
	}
}


export class AddListenerContext extends ParserRuleContext {
	public EVENT(): TerminalNode { return this.getToken(RASPParser.EVENT, 0); }
	public RECEIVER(): TerminalNode { return this.getToken(RASPParser.RECEIVER, 0); }
	public FROM(): TerminalNode { return this.getToken(RASPParser.FROM, 0); }
	public serviceName(): ServiceNameContext {
		return this.getRuleContext(0, ServiceNameContext);
	}
	public setServiceAs(): SetServiceAsContext | undefined {
		return this.tryGetRuleContext(0, SetServiceAsContext);
	}
	public object(): ObjectContext | undefined {
		return this.tryGetRuleContext(0, ObjectContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_addListener; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterAddListener) listener.enterAddListener(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitAddListener) listener.exitAddListener(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitAddListener) return visitor.visitAddListener(this);
		else return visitor.visitChildren(this);
	}
}


export class AddEmitterContext extends ParserRuleContext {
	public SEND(): TerminalNode { return this.getToken(RASPParser.SEND, 0); }
	public QUERIES(): TerminalNode { return this.getToken(RASPParser.QUERIES, 0); }
	public TO(): TerminalNode { return this.getToken(RASPParser.TO, 0); }
	public serviceName(): ServiceNameContext {
		return this.getRuleContext(0, ServiceNameContext);
	}
	public setServiceAs(): SetServiceAsContext | undefined {
		return this.tryGetRuleContext(0, SetServiceAsContext);
	}
	public object(): ObjectContext | undefined {
		return this.tryGetRuleContext(0, ObjectContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_addEmitter; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterAddEmitter) listener.enterAddEmitter(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitAddEmitter) listener.exitAddEmitter(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitAddEmitter) return visitor.visitAddEmitter(this);
		else return visitor.visitChildren(this);
	}
}


export class RequestServiceEventsContext extends ParserRuleContext {
	public SEND(): TerminalNode { return this.getToken(RASPParser.SEND, 0); }
	public events(): EventsContext {
		return this.getRuleContext(0, EventsContext);
	}
	public EVENTS(): TerminalNode { return this.getToken(RASPParser.EVENTS, 0); }
	public FROM(): TerminalNode { return this.getToken(RASPParser.FROM, 0); }
	public serviceName(): ServiceNameContext {
		return this.getRuleContext(0, ServiceNameContext);
	}
	public TO(): TerminalNode { return this.getToken(RASPParser.TO, 0); }
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_requestServiceEvents; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterRequestServiceEvents) listener.enterRequestServiceEvents(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitRequestServiceEvents) listener.exitRequestServiceEvents(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitRequestServiceEvents) return visitor.visitRequestServiceEvents(this);
		else return visitor.visitChildren(this);
	}
}


export class EventsContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RASPParser.ID);
		} else {
			return this.getToken(RASPParser.ID, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_events; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterEvents) listener.enterEvents(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitEvents) listener.exitEvents(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitEvents) return visitor.visitEvents(this);
		else return visitor.visitChildren(this);
	}
}


export class SetServiceAsContext extends ParserRuleContext {
	public SET(): TerminalNode { return this.getToken(RASPParser.SET, 0); }
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	public AS(): TerminalNode { return this.getToken(RASPParser.AS, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_setServiceAs; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterSetServiceAs) listener.enterSetServiceAs(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitSetServiceAs) listener.exitSetServiceAs(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitSetServiceAs) return visitor.visitSetServiceAs(this);
		else return visitor.visitChildren(this);
	}
}


export class SetIdFromContext extends ParserRuleContext {
	public SET(): TerminalNode { return this.getToken(RASPParser.SET, 0); }
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	public FROM(): TerminalNode { return this.getToken(RASPParser.FROM, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_setIdFrom; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterSetIdFrom) listener.enterSetIdFrom(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitSetIdFrom) listener.exitSetIdFrom(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitSetIdFrom) return visitor.visitSetIdFrom(this);
		else return visitor.visitChildren(this);
	}
}


export class ListenerMethodContext extends ParserRuleContext {
	public METHOD(): TerminalNode { return this.getToken(RASPParser.METHOD, 0); }
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	public RECEIVES(): TerminalNode | undefined { return this.tryGetToken(RASPParser.RECEIVES, 0); }
	public listenerEventReceiver(): ListenerEventReceiverContext[];
	public listenerEventReceiver(i: number): ListenerEventReceiverContext;
	public listenerEventReceiver(i?: number): ListenerEventReceiverContext | ListenerEventReceiverContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ListenerEventReceiverContext);
		} else {
			return this.getRuleContext(i, ListenerEventReceiverContext);
		}
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_listenerMethod; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterListenerMethod) listener.enterListenerMethod(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitListenerMethod) listener.exitListenerMethod(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitListenerMethod) return visitor.visitListenerMethod(this);
		else return visitor.visitChildren(this);
	}
}


export class ListenerEventReceiverContext extends ParserRuleContext {
	public events(): EventsContext {
		return this.getRuleContext(0, EventsContext);
	}
	public FROM(): TerminalNode { return this.getToken(RASPParser.FROM, 0); }
	public serviceName(): ServiceNameContext {
		return this.getRuleContext(0, ServiceNameContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_listenerEventReceiver; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterListenerEventReceiver) listener.enterListenerEventReceiver(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitListenerEventReceiver) listener.exitListenerEventReceiver(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitListenerEventReceiver) return visitor.visitListenerEventReceiver(this);
		else return visitor.visitChildren(this);
	}
}


export class ListenerErrorContext extends ParserRuleContext {
	public ERRORMETHOD(): TerminalNode { return this.getToken(RASPParser.ERRORMETHOD, 0); }
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_listenerError; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterListenerError) listener.enterListenerError(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitListenerError) listener.exitListenerError(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitListenerError) return visitor.visitListenerError(this);
		else return visitor.visitChildren(this);
	}
}


export class StatementContext extends ParserRuleContext {
	public method(): MethodContext | undefined {
		return this.tryGetRuleContext(0, MethodContext);
	}
	public assignment(): AssignmentContext | undefined {
		return this.tryGetRuleContext(0, AssignmentContext);
	}
	public r_if(): R_ifContext | undefined {
		return this.tryGetRuleContext(0, R_ifContext);
	}
	public r_while(): R_whileContext | undefined {
		return this.tryGetRuleContext(0, R_whileContext);
	}
	public loop(): LoopContext | undefined {
		return this.tryGetRuleContext(0, LoopContext);
	}
	public print(): PrintContext | undefined {
		return this.tryGetRuleContext(0, PrintContext);
	}
	public sendQuery(): SendQueryContext | undefined {
		return this.tryGetRuleContext(0, SendQueryContext);
	}
	public end(): EndContext | undefined {
		return this.tryGetRuleContext(0, EndContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_statement; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterStatement) listener.enterStatement(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitStatement) listener.exitStatement(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitStatement) return visitor.visitStatement(this);
		else return visitor.visitChildren(this);
	}
}


export class ExprContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public IS(): TerminalNode | undefined { return this.tryGetToken(RASPParser.IS, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(RASPParser.NOT, 0); }
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public method(): MethodContext | undefined {
		return this.tryGetRuleContext(0, MethodContext);
	}
	public stringMethod(): StringMethodContext | undefined {
		return this.tryGetRuleContext(0, StringMethodContext);
	}
	public variable(): VariableContext | undefined {
		return this.tryGetRuleContext(0, VariableContext);
	}
	public object(): ObjectContext | undefined {
		return this.tryGetRuleContext(0, ObjectContext);
	}
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(RASPParser.NUMBER, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(RASPParser.STRING, 0); }
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(RASPParser.BOOLEAN, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_expr; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterExpr) listener.enterExpr(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitExpr) listener.exitExpr(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitExpr) return visitor.visitExpr(this);
		else return visitor.visitChildren(this);
	}
}


export class ServiceNameContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_serviceName; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterServiceName) listener.enterServiceName(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitServiceName) listener.exitServiceName(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitServiceName) return visitor.visitServiceName(this);
		else return visitor.visitChildren(this);
	}
}


export class VariableContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RASPParser.ID);
		} else {
			return this.getToken(RASPParser.ID, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_variable; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterVariable) listener.enterVariable(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitVariable) listener.exitVariable(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitVariable) return visitor.visitVariable(this);
		else return visitor.visitChildren(this);
	}
}


export class ObjectContext extends ParserRuleContext {
	public property(): PropertyContext[];
	public property(i: number): PropertyContext;
	public property(i?: number): PropertyContext | PropertyContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PropertyContext);
		} else {
			return this.getRuleContext(i, PropertyContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_object; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterObject) listener.enterObject(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitObject) listener.exitObject(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitObject) return visitor.visitObject(this);
		else return visitor.visitChildren(this);
	}
}


export class ArrayContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RASPParser.ID);
		} else {
			return this.getToken(RASPParser.ID, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_array; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterArray) listener.enterArray(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitArray) listener.exitArray(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitArray) return visitor.visitArray(this);
		else return visitor.visitChildren(this);
	}
}


export class PropertyContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_property; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterProperty) listener.enterProperty(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitProperty) listener.exitProperty(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitProperty) return visitor.visitProperty(this);
		else return visitor.visitChildren(this);
	}
}


export class AssignmentContext extends ParserRuleContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_assignment; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterAssignment) listener.enterAssignment(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitAssignment) listener.exitAssignment(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitAssignment) return visitor.visitAssignment(this);
		else return visitor.visitChildren(this);
	}
}


export class R_ifContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_r_if; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterR_if) listener.enterR_if(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitR_if) listener.exitR_if(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitR_if) return visitor.visitR_if(this);
		else return visitor.visitChildren(this);
	}
}


export class R_whileContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_r_while; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterR_while) listener.enterR_while(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitR_while) listener.exitR_while(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitR_while) return visitor.visitR_while(this);
		else return visitor.visitChildren(this);
	}
}


export class LoopContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_loop; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterLoop) listener.enterLoop(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitLoop) listener.exitLoop(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitLoop) return visitor.visitLoop(this);
		else return visitor.visitChildren(this);
	}
}


export class PrintContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_print; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterPrint) listener.enterPrint(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitPrint) listener.exitPrint(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitPrint) return visitor.visitPrint(this);
		else return visitor.visitChildren(this);
	}
}


export class EndContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_end; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterEnd) listener.enterEnd(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitEnd) listener.exitEnd(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitEnd) return visitor.visitEnd(this);
		else return visitor.visitChildren(this);
	}
}


export class SendQueryContext extends ParserRuleContext {
	public QUERY(): TerminalNode { return this.getToken(RASPParser.QUERY, 0); }
	public object(): ObjectContext {
		return this.getRuleContext(0, ObjectContext);
	}
	public setIdFrom(): SetIdFromContext | undefined {
		return this.tryGetRuleContext(0, SetIdFromContext);
	}
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RASPParser.ID);
		} else {
			return this.getToken(RASPParser.ID, i);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_sendQuery; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterSendQuery) listener.enterSendQuery(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitSendQuery) listener.exitSendQuery(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitSendQuery) return visitor.visitSendQuery(this);
		else return visitor.visitChildren(this);
	}
}


export class MethodContext extends ParserRuleContext {
	public variable(): VariableContext {
		return this.getRuleContext(0, VariableContext);
	}
	public methodList(): MethodListContext[];
	public methodList(i: number): MethodListContext;
	public methodList(i?: number): MethodListContext | MethodListContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MethodListContext);
		} else {
			return this.getRuleContext(i, MethodListContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_method; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterMethod) listener.enterMethod(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitMethod) listener.exitMethod(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitMethod) return visitor.visitMethod(this);
		else return visitor.visitChildren(this);
	}
}


export class MethodListContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_methodList; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterMethodList) listener.enterMethodList(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitMethodList) listener.exitMethodList(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitMethodList) return visitor.visitMethodList(this);
		else return visitor.visitChildren(this);
	}
}


export class StringMethodContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(RASPParser.STRING, 0); }
	public method(): MethodContext {
		return this.getRuleContext(0, MethodContext);
	}
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_stringMethod; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterStringMethod) listener.enterStringMethod(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitStringMethod) listener.exitStringMethod(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitStringMethod) return visitor.visitStringMethod(this);
		else return visitor.visitChildren(this);
	}
}


export class EnvvarContext extends ParserRuleContext {
	public ID(): TerminalNode { return this.getToken(RASPParser.ID, 0); }
	constructor(parent: ParserRuleContext, invokingState: number);
	constructor(parent: ParserRuleContext, invokingState: number) {
		super(parent, invokingState);

	}
	@Override public get ruleIndex(): number { return RASPParser.RULE_envvar; }
	@Override
	public enterRule(listener: RASPListener): void {
		if (listener.enterEnvvar) listener.enterEnvvar(this);
	}
	@Override
	public exitRule(listener: RASPListener): void {
		if (listener.exitEnvvar) listener.exitEnvvar(this);
	}
	@Override
	public accept<Result>(visitor: RASPVisitor<Result>): Result {
		if (visitor.visitEnvvar) return visitor.visitEnvvar(this);
		else return visitor.visitChildren(this);
	}
}


