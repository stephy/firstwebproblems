/*
  First Web Problems
  Javascript 
  by Stephani Alves & Kevin Deng
*/

function Eraser(size, featherSize) {
  this.handlers = {
    mouseup: this.mouseUpHandler,
    mousedown: this.mouseDownHandler,
    mousemove: this.mouseMoveHandler,
    mouseenter: this.mouseEnterHandler,
    mouseleave: this.mouseLeaveHandler
  };

  if (size > 0) {
    this.eraserSize = size;
  }
  if (featherSize >= 0) {
    this.featherSize = featherSize;
  }
}

Eraser.prototype = {

  eraserSize: 100,
  eraserFeatherSize: 100,
  canvasElement: null,
  ctx: null,
  isDragging: false,
  isHovering: false,
  isCompleted: false,
  container: null,
  image: null,
  callback: null,
  checkCompleteTimeout: 0,

  appendTo: function(element) {
    this.container = $(element);
    this.canvasElement = document.createElement('canvas');
    this.container.append(this.canvasElement);

    this.canvasElement.width = this.container.width();
    this.canvasElement.height = this.container.height();
    this.ctx = this.canvasElement.getContext('2d');

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    this.ctx.fillRect(0, 0, this.canvasElement.width,
      this.canvasElement.height);

    if (this.image && this.image.naturalWidth) {
      this.imageLoadHandler();
    }
    else if (this.image) {
      $(this.image).load(this.imageLoadHandler.bind(this));
    }

    return this;
  },

  imageLoadHandler: function() {
    this.bindHandlers();
    this.drawImage();
  },

  bindHandlers: function() {
    $(this.canvasElement).bind(
      'mouseenter mouseleave mousemove mousedown mouseup',
      this.mouseHandler.bind(this));
    $(window).bind('mouseup', (function() {
      this.isDragging = false;
    }).bind(this));
  },

  drawImage: function() {
    this.ctx.drawImage(this.image.length > 0 ? this.image[0] : this.image,
      0, 0, this.canvasElement.width, this.canvasElement.height);
  },

  loadImage: function(image) {
    this.image = image.length > 0 ? image[0] : image;
    if (this.container && this.canvasElement) {
      this.image.load(this.imageLoadHandler.bind(this));
    }
    return this;
  },

  onComplete: function(callback) {
    this.callback = callback;
    return this;
  },

  checkComplete: function() {
    if (this.isComplete) {
      return;
    }

    var data = this.ctx.getImageData(0, 0, this.canvasElement.width,
      this.canvasElement.height);
    var complete = true;
    for (var i = 3; i < data.data.length; i += 4) {
      if (data.data[i] > 50) {
        complete = false;
        break;
      }
    }

    if (complete && this.callback) {
      this.isComplete = true;
      this.callback();
    }
  },

  erase: function(x, y) {
    var totalSize = this.eraserSize + this.eraserFeatherSize;
    var data = this.ctx.getImageData(x - totalSize / 2,
      y - totalSize / 2, totalSize, totalSize);

    var mx = totalSize / 2;
    var my = totalSize / 2;
    for (var i = 0; i < totalSize; i++) {
      for (var j = 0; j < totalSize; j++) {
        var dx = mx - i;
        var dy = my - j;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d <= totalSize / 2) {
          var t = (d - this.eraserSize / 2) / this.eraserFeatherSize * 2;
          var alpha = d < this.eraserSize / 2 ? 0 : t;
          var idx = (i + j * totalSize) * 4 + 3;
          data.data[idx] = Math.round(alpha * data.data[idx]);
        }
      }
    }

    this.ctx.putImageData(data, x - totalSize / 2, y - totalSize / 2);

    window.clearTimeout(this.checkCompleteTimeout);
    this.checkCompleteTimeout = window.setTimeout(
      this.checkComplete.bind(this), 150);
  },

  mouseDownHandler: function(x, y) {
    this.isDragging = true;
    this.erase(x, y);
  },

  mouseUpHandler: function(x, y) {
    this.isDragging = false;
  },

  mouseMoveHandler: function(x, y) {
    this.isHovering = true;
    if (this.isDragging) {
      this.erase(x, y);
    }
  },

  mouseEnterHandler: function(x, y) {
    this.isHovering = true;
  },

  mouseLeaveHandler: function(x, y) {
    this.isHovering = false;
  },

  mouseHandler: function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    this.handlers[e.type].call(this, x, y);
  }

}
