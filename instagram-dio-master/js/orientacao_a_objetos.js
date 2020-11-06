'use strict';
/**
 * Herança de prototipos
 */
function Animal(){};

Animal.prototype.qtdepatas = 0;
Animal.prototype.movimentar = function(){};

function Cachorro(morde){
    this.qtdepatas = 4;
    this.morde = morde;
}

Cachorro.prototype = Object.create(Animal);
Cachorro.prototype.latir = function(){
    console.log('Au! au!');
}

const pug = new Cachorro(true);
const pitbull = new Cachorro(false);

/**
 * Herança de Classes + simples
 */
class Animal{
    constructor(qtdepatas){
        this.qtdepatas = qtdepatas;
    }
}

class Cachorro extends Animal{
    constructor(morde){
        super(4);
        this.morde = morde;
    }

    latir(){
        console.log('Au! au!');
    }
}

const pug = new Cachorro(true);
const pitbull = new Cachorro(false);

/**
 * Modificadores de acesso (Versão 12) - No JS é novo pode ser que não tenha suporte no browser ainda
 * para deixar privado usar let no atributo dentro de prototipos ou utilizar o # em classes
 */

 class Gato extends Animal{
    #cor = '';

    constructor(morde){
        super(4);
        this.morde = morde;
    }

    mia(){
        console.log('Mial! mial!');
    }

    /**
     * Encapsulamento
     * x.cor = y
     * console.log(x.cor)
     */
    set cor(cor){
        this.#cor=cor;
    }

    get cor(){
        return this.#cor;
    }

    /**
     * Static
     */

    static anda(){
        console.log("pow pow....pow pow");
    }
 }