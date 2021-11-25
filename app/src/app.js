import ARNEngine from './ARNEngine/arn-engine.js';
import nazo01 from './NazoPlugins/nazo01';
import nazo02 from './NazoPlugins/nazo02';

const arn = new ARNEngine('scene-main');
arn.registerNazoPlugin('nazo01', nazo01);
arn.registerNazoPlugin('nazo02', nazo02);
