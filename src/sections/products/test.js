const a = [
	{x:10, y:20}, {x:3, y:4}, {x:100, y:200}
];
console.log([...a.filter((_, index) => index !== 1), {x:3, y:4}]);

console.log(a.toSpliced(2,1,{x:6, y:7}))