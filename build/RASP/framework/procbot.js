"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class ProcBotGenerator {
    static exitBotDefinition(ctx, botStructure) {
        botStructure.botName = ctx.ID().text;
    }
}
exports.ProcBotGenerator = ProcBotGenerator;
function addListenerMethods(listener, definition) {
    listener['exitBotDefinition'] = _.partial(ProcBotGenerator.exitBotDefinition, _, definition);
}
exports.addListenerMethods = addListenerMethods;

//# sourceMappingURL=procbot.js.map