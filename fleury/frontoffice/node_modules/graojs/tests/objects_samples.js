function ClassPrototype() {};
ClassPrototype.prototype.meuAtributo = 'Olá Mundo';
ClassPrototype.prototype.meuMetodo = function() {
	return this.meuAtributo;
};
var objPrototype = new ClassPrototype();
console.log(objPrototype.meuMetodo());

var ClassLiteral = {
	meuAtributo: 'Olá Mundo',
	meuMetodo: function()
	{
		return ClassLiteral.meuAtributo;
	}
};
console.log(ClassLiteral.meuMetodo());

var ClassFunction = function() {
	self = this;
	this.meuAtributo = 'Olá Mundo';
	this.meuMetodo = function() {
		return this.meuAtributo;
	};
};
var objFunction = new ClassFunction();
console.log(objFunction.meuMetodo());



