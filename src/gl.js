const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

export default {
  init(selector) {
    const canvas = document.querySelector(selector);
    // Initialize the GL context
    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }

    console.info(gl.COLOR_BUFFER_BIT)

    // Set clear color to black, fully opaque
    gl.clearColor(0, 0, 0, 1);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  },

  drawPiont() {
    //顶点着色器程序
    const VSHADER_SOURCE = `
      void main() {
        //设置坐标
        gl_Position = vec4(0.0, 0.0, 0, 1.0);
        //设置尺寸
        gl_PointSize = 50.0;
      }
    `
    //片元着色器
    const FSHADER_SOURCE = `
      void main() {
        //设置颜色
        gl_FragColor = vec4(1.0, 0, 0.0, 1.0);
      }
    `
    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.log("Failed");
      return;
    }

    //编译着色器
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, VSHADER_SOURCE);
    gl.compileShader(vertShader);

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, FSHADER_SOURCE);
    gl.compileShader(fragShader);

    //合并程序
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //绘制一个点
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  },

  drawCustom() {
    //顶点着色器程序
    var VSHADER_SOURCE = `
      attribute vec4 a_Position;
      void main() {
        //设置坐标
        gl_Position = a_Position;
      } 
    `;

    //片元着色器
    var FSHADER_SOURCE = `
      void main() {
        //设置颜色
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `;
    //获取canvas元素
    var canvas = document.querySelector('canvas');
    //获取绘制二维上下文
    var gl = canvas.getContext('webgl');
    if (!gl) {
      console.log("Failed");
      return;
    }
    //编译着色器
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, VSHADER_SOURCE);
    gl.compileShader(vertShader);

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, FSHADER_SOURCE);
    gl.compileShader(fragShader);
    //合并程序
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //获取坐标点
    var a_Position = gl.getAttribLocation(shaderProgram, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
    }

    var n = this.initBuffers(gl, shaderProgram);

    if (n < 0) {
      console.log('Failed to set the positions');
      return;
    }
    // 清除指定<画布>的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空 <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, n);
  },

  initBuffers(gl, shaderProgram) {
    var vertices = new Float32Array([
      0.0, 0.2, -0.2, -0.2, 0.2, -0.2, 0.2, 0, 0.2, 0.2, 1, 0
    ]);
    var n = 6; //点的个数
    //创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log("Failed to create the butter object");
      return -1;
    }
    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //获取坐标点
    var a_Position = gl.getAttribLocation(shaderProgram, 'a_Position');
    //将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    //连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);
    return n;

  }
}
