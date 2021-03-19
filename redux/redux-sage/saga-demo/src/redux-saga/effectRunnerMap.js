import * as effectTypes from './effectTypes';

function runTakeEffect(env, payload, next) {
    const matcher = actions => actions.type === payload.pattern;
    env.channel.take(next, matcher);
}
function runPutEffect(env, payload, next) {
    env.dispatch(payload.action);
    next();
}
const effectRunnerMap = {
    [effectTypes.TAKE]: runTakeEffect,
    [effectTypes.PIT]: runPutEffect
}

export default effectRunnerMap;