function a(){
    console.log(this) //global
}

class B {
    constructor(num){
        this.num=num
    }
    number(){
        console.log(this)
    }
}
const b=new B(1);
b.number(); 
// B { num: 1 } 클래스 안에있는 함수의 this는 클래스를 가리킨다

console.log(this) 
//{}
console.log(this===module.exports) 
// true // 브라우저 this===window

module.exports.a=a
console.log(this) 
//{ a: [Function: a] }

