const express = require('express')
const static = require('express-static')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const jade = require('jade')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

let server = express()


// 1.cookies
server.use(cookieParser('asdf123jkhasd'))

// 2.session
let arr = (function () {
	let arr = [];
	for (var i = 0; i < 100000; i++) {
		arr.push('sess_'+Math.random());
	}
	return arr;
})();
server.use(cookieSession({
	name: 'session',
	keys: arr,
	maxAge: 20*60*1000
}))


// post数据
server.use(bodyParser.urlencoded({extended: false}))

// objMulter.single('f1')
server.use(multer({dest: './www/upload/'}).any())

server.post('/', (req, res, next) => {
	// console.log(req.files)
	// console.log(req.query, req.body, req.cookies, req.session)
	
	if (req.files) {
		let file = req.files[0]
		let ext = path.extname(file.originalname)
		let pathname = __dirname + '\\' + file.path + ext
		
		fs.rename(file.path, pathname, function (err) {
			if (err) {
				res.send('文件上传失败')
			}else{
				res.send('文件上传成功')
			}
		})
	}

	console.log(req.body)

})

// 静态文件
server.use(static('./www'))


server.listen(8080)

