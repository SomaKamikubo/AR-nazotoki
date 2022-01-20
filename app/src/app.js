import ARNEngine from './ARNEngine/arn-engine.js';
import nazo01 from './NazoPlugins/nazo01';
import nazo02 from './NazoPlugins/nazo02';
import nazo03 from './NazoPlugins/nazo03';
import nazo04 from './NazoPlugins/nazo04';
import nazo03st from './NazoPlugins/nazo03-syncTest';

const arn = new ARNEngine('scene-main');
arn.registerNazoPlugin('nazo01', nazo01);
arn.registerNazoPlugin('nazo02', nazo02);
arn.registerNazoPlugin('nazo04', nazo04);
// arn.registerNazoPlugin('nazo03', nazo03);
// arn.registerNazoPlugin('nazo03st', nazo03st);
