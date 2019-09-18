// decorator 外部可以包装一个函数，函数可以带参数
function Decorator(type) {
	/**
	 * 这里是真正的 decorator
	 * @target 装饰的属性所述的类的原型，注意，不是实例后的类。如果装饰的是 Car 的某个属性，这个 target 的值就是 Car.prototype
	 * @name 装饰的属性的 key
	 * @descriptor 装饰的对象的描述对象
	 */
	return function (target, name, descriptor) {
		// 以此可以获取实例化的时候此属性的默认值
		let v = descriptor.initializer && descriptor.initializer.call(this);
		// 返回一个新的描述对象，或者直接修改 descriptor 也可以
		return {
			enumerable: true,
			configurable: true,
			get: function () {
				return v;
			},
			set: function (c) {
				v = c;
			}
		}
	}
}

class Dog {
	@readOnly;
	bark(){
		return "wang wang"
	}
}

//  注意这里的 `target` 是 `Dog.prototype`;
function readOnly(target,key,descriptor) {
	descriptor.writable = false;
	return descriptor;
}