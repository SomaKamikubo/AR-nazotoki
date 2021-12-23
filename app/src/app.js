import ARNEngine from './ARNEngine/arn-engine.js';
import nazo01 from './NazoPlugins/nazo01';
import nazo02 from './NazoPlugins/nazo02';
import nazo03 from './NazoPlugins/nazo03';
import nazo04 from './NazoPlugins/nazo04';

const arn = new ARNEngine('scene-main');
arn.registerNazoPlugin('nazo01', nazo01);
arn.registerNazoPlugin('nazo02', nazo02);
//arn.registerNazoPlugin('nazo03', nazo03);//マーカー被りがあるため,nazo03をコメントアウト
arn.registerNazoPlugin('nazo04', nazo04);