
	var yyy = document.getElementById('myCanvas');
	var context = yyy.getContext('2d');
	var lineWidth = 1
	
	autoSetCanvasSize(yyy)

	listenToUser(yyy)

	var eraserEnabled = false
	pen.onclick = function() {
	   eraserEnabled = false;
	   pen.classList.add('active')
	   eraser.classList.remove('active')	 
	}
    eraser.onclick = function() {
		eraserEnabled= true;
		eraser.classList.add('active')
		pen.classList.remove('active')
	}
    red.onclick = function(){
		context.fillStyle = 'red'
		context.strokeStyle = 'red'
		red.classList.add('active')
		green.classList.remove('active')
		blue.classList.remove('active')
        black.classList.remove('active')
        orange.classList.remove('active')
        yellow.classList.remove('active')
        purple.classList.remove('active')
	}
	green.onclick = function(){
		context.fillStyle = 'green'
		context.strokeStyle = 'green'
		green.classList.add('active')
		red.classList.remove('active')
		blue.classList.remove('active')
        black.classList.remove('active')
        orange.classList.remove('active')
        yellow.classList.remove('active')
        purple.classList.remove('active')
	}
	blue.onclick = function(){
		context.fillStyle = 'blue'
		context.strokeStyle = 'blue'
		blue.classList.add('active')
		green.classList.remove('active')
		red.classList.remove('active')
        black.classList.remove('active')
        orange.classList.remove('active')
        yellow.classList.remove('active')
        purple.classList.remove('active')
	}
	black.onclick = function(){
		context.fillStyle = 'black'
		context.strokeStyle = 'black'
		black.classList.add('active')
		green.classList.remove('active')
		red.classList.remove('active')
        blue.classList.remove('active')
        orange.classList.remove('active')
        yellow.classList.remove('active')
        purple.classList.remove('active')
    }
    purple.onclick = function(){
		context.fillStyle = 'purple'
		context.strokeStyle = 'purple'
		purple.classList.add('active')
		green.classList.remove('active')
		red.classList.remove('active')
        black.classList.remove('active')
        orange.classList.remove('active')
        yellow.classList.remove('active')
        blue.classList.remove('active')
    }
    yellow.onclick = function(){
		context.fillStyle = 'yellow'
		context.strokeStyle = 'yellow'
		yellow.classList.add('active')
		green.classList.remove('active')
		red.classList.remove('active')
        blue.classList.remove('active')
        purple.classList.remove('active')
        orange.classList.remove('active')
        black.classList.remove('active')
    }
    orange.onclick = function(){
		context.fillStyle = 'orange'
		context.strokeStyle = 'orange'
		orange.classList.add('active')
		green.classList.remove('active')
		red.classList.remove('active')
        black.classList.remove('active')
        purple.classList.remove('active')
        yellow.classList.remove('active')
        blue.classList.remove('active')
    }
    
    clear.onclick = function(){
        context.clearRect(0,0,yyy.width,yyy.height);
	}
    save.onclick = function(){
		var url = yyy.toDataURL("image/png")
		var a = document.createElement('a')
		document.body.appendChild(a)
		a.href = url
		a.download = '起个名吧'
		a.target = '_blank'
		a.click()
	}
    thin.onclick = function(){
		lineWidth = 1
	}
	medium.onclick = function(){
		lineWidth = 5
	}

	function autoSetCanvasSize(canvas) {
		setCanvasSize()

		window.onresize = function () {
			setCanvasSize()
		}
		function setCanvasSize() {
			var pageWidth = document.documentElement.clientWidth
			var pageHeight = document.documentElement.clientHeight
			canvas.width = pageWidth
			canvas.height = pageHeight
		}
	}

	function drawCircle(x, y, radius) {
		context.beginPath()
		context.arc(x, y, radius, 0, Math.PI * 2);
		context.fill()

	}

	function drawLine(x1, y1, x2, y2) {
		context.beginPath();
		context.moveTo(x1, y1)
		context.lineWidth = lineWidth
		context.lineTo(x2, y2)
		context.stroke()
		context.closePath()
	}

	function listenToUser(canvas) {
		var using = false
		var lastPoint = {
			x: undefined,
			y: undefined
		}
		if (document.body.ontouchstart !== undefined) {
			//触屏设备
			canvas.ontouchstart = function (aaa) {
				var x = aaa.touches[0].clientX
				var y = aaa.touches[0].clientY
				using = true
				if (eraserEnabled) {
					context.clearRect(x - 5, y - 5, 10, 10)
				} else {
					lastPoint = {
						"x": x,
						"y": y
					}
				}
			}
			canvas.ontouchmove = function (aaa) {
				var x = aaa.touches[0].clientX
				var y = aaa.touches[0].clientY
				if (!using) { return }
				if (eraserEnabled) {
					context.clearRect(x - 5, y - 5, 10, 10)
				} else {
					var newPoint = {
						"x": x,
						"y": y
					}
					drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
					lastPoint = newPoint
				}


			}
			canvas.ontouchend = function () {
				using = false

			}
		} else {
			//非触屏设备
			canvas.onmousedown = function (aaa) {
				var x = aaa.clientX
				var y = aaa.clientY
				using = true
				if (eraserEnabled) {
					context.clearRect(x - 5, y - 5, 10, 10)
				} else {
					lastPoint = {
						"x": x,
						"y": y
					}
				}
			}
			canvas.onmousemove = function (aaa) {
				var x = aaa.clientX
				var y = aaa.clientY
				if (!using) { return }
				if (eraserEnabled) {
					context.clearRect(x - 5, y - 5, 10, 10)
				} else {
					var newPoint = {
						"x": x,
						"y": y
					}
					drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
					lastPoint = newPoint
				}
			}
			canvas.onmouseup = function (aaa) {
				using = false
			}
		}

	}