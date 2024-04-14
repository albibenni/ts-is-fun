function human(myName: string) {
	const name = myName
	function sayHi() {
		console.log(`hi i'm ${name}`)
	}
	function sayHowYouFeel() {
		console.log(`${name} feeling good!`)
	}
	return {
		sayHi,
		sayHowYouFeel
	}
}

const albi = human('albi')
const kris = human('kris')

// albi.sayHi()
// albi.sayHowYouFeel()
// kris.sayHi()
// kris.sayHowYouFeel()

function clickHandler(size: number) {
	return function() {
		document.body.style.fontSize = `${size}px`
	}
}
if (document.getElementById('size-8')) document.getElementById('size-8')!.onclick = clickHandler(8)

// instead of the obvious:
// function clickHandler() {
//  	document.body.style.fontsize = `${size}px`
//}
// that would return undefined if assigned to:
// 	document.getElementById('size-12').onclick = clickHandler(12)
