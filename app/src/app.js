import ARNEngine from './ARNEngine/arn-engine.js';
import nazo01 from './NazoPlugins/nazo01';

console.log('test !!');
const arn = new ARNEngine('scene-main');
arn.registerNazoPlugin('nazo01', nazo01);
