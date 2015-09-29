#!/usr/bin/env node
/**
 * @author Pedro Nasser
 *		   Marcelo M. Fleury
 */
var maxMethods = 100000;
var maxObjects = 10000000;
var object;

// Object Proto
function ClassProto () {};

console.time('ClassProtoMethods');
for (var m = 0; m < maxMethods; m++)
	ClassProto.prototype['method'+m] = function (o) { return 1+o; };
console.timeEnd('ClassProtoMethods');

console.time('ClassProtoCalls');
for (var o = 0; o < maxObjects; o++)
{
	object = new ClassProto();
	object.method99999(o);
}
console.timeEnd('ClassProtoCalls');

// Object Literal
var ClassLiteral = {};
console.time('ClassLiteralMethods');
for (var m = 0; m < maxMethods; m++)
	ClassLiteral['method'+m] = function (o) { return 1+o; };
console.timeEnd('ClassLiteralMethods');

console.time('ClassLiteralCalls'); 
for (var o = 0; o < maxObjects; o++)
{
	//object = Object.create(ClassLiteral);
	//object.method99999(o);
	ClassLiteral.method99999(o);
}
console.timeEnd('ClassLiteralCalls');

// Object Function
var ObjectFunction = function (){};

console.time('ObjectFunctionMethods');
for (var m = 0; m < maxMethods; m++)
	ObjectFunction.prototype['method'+m] = function (o) { return 1+o; };
console.timeEnd('ObjectFunctionMethods'); 

console.time('ObjectFunctionCalls'); 
for (var o = 0; o < maxObjects; o++)
{
	object = new ObjectFunction();
	object.method99999(o);
} 
console.timeEnd('ObjectFunctionCalls');