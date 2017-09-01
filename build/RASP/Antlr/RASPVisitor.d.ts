import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { InitContext } from './RASPParser';
import { BotDefinitionContext } from './RASPParser';
import { BotBodyContext } from './RASPParser';
import { AddListenerContext } from './RASPParser';
import { AddEmitterContext } from './RASPParser';
import { RequestServiceEventsContext } from './RASPParser';
import { EventsContext } from './RASPParser';
import { SetServiceAsContext } from './RASPParser';
import { SetIdFromContext } from './RASPParser';
import { ListenerMethodContext } from './RASPParser';
import { ListenerEventReceiverContext } from './RASPParser';
import { ListenerErrorContext } from './RASPParser';
import { StatementContext } from './RASPParser';
import { AssignmentContext } from './RASPParser';
import { R_ifContext } from './RASPParser';
import { R_if_elseifContext } from './RASPParser';
import { R_if_elseContext } from './RASPParser';
import { R_whileContext } from './RASPParser';
import { LoopContext } from './RASPParser';
import { PrintContext } from './RASPParser';
import { SendQueryContext } from './RASPParser';
import { ExprContext } from './RASPParser';
import { ServiceNameContext } from './RASPParser';
import { VariableContext } from './RASPParser';
import { ObjectContext } from './RASPParser';
import { ArrayContext } from './RASPParser';
import { PropertyContext } from './RASPParser';
import { MethodContext } from './RASPParser';
import { MethodListContext } from './RASPParser';
import { StringMethodContext } from './RASPParser';
import { EnvvarContext } from './RASPParser';
export interface RASPVisitor<Result> extends ParseTreeVisitor<Result> {
    visitInit?: (ctx: InitContext) => Result;
    visitBotDefinition?: (ctx: BotDefinitionContext) => Result;
    visitBotBody?: (ctx: BotBodyContext) => Result;
    visitAddListener?: (ctx: AddListenerContext) => Result;
    visitAddEmitter?: (ctx: AddEmitterContext) => Result;
    visitRequestServiceEvents?: (ctx: RequestServiceEventsContext) => Result;
    visitEvents?: (ctx: EventsContext) => Result;
    visitSetServiceAs?: (ctx: SetServiceAsContext) => Result;
    visitSetIdFrom?: (ctx: SetIdFromContext) => Result;
    visitListenerMethod?: (ctx: ListenerMethodContext) => Result;
    visitListenerEventReceiver?: (ctx: ListenerEventReceiverContext) => Result;
    visitListenerError?: (ctx: ListenerErrorContext) => Result;
    visitStatement?: (ctx: StatementContext) => Result;
    visitAssignment?: (ctx: AssignmentContext) => Result;
    visitR_if?: (ctx: R_ifContext) => Result;
    visitR_if_elseif?: (ctx: R_if_elseifContext) => Result;
    visitR_if_else?: (ctx: R_if_elseContext) => Result;
    visitR_while?: (ctx: R_whileContext) => Result;
    visitLoop?: (ctx: LoopContext) => Result;
    visitPrint?: (ctx: PrintContext) => Result;
    visitSendQuery?: (ctx: SendQueryContext) => Result;
    visitExpr?: (ctx: ExprContext) => Result;
    visitServiceName?: (ctx: ServiceNameContext) => Result;
    visitVariable?: (ctx: VariableContext) => Result;
    visitObject?: (ctx: ObjectContext) => Result;
    visitArray?: (ctx: ArrayContext) => Result;
    visitProperty?: (ctx: PropertyContext) => Result;
    visitMethod?: (ctx: MethodContext) => Result;
    visitMethodList?: (ctx: MethodListContext) => Result;
    visitStringMethod?: (ctx: StringMethodContext) => Result;
    visitEnvvar?: (ctx: EnvvarContext) => Result;
}
