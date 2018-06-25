const c1 = document.createElement('canvas')
const c2 = document.createElement('canvas')
c1.id = 'watermark'
c1.width = '160'
c1.height = '100'
c1.style = "display: none"
c2.id = 'repeat-watermark'
c2.style = 'position:fixed;top:0;z-index:-1;background:#fff'
// c2.style = 'position:fixed;top:0;z-index:-1;background:#fff'

const Watermark = function(container, options) {
    let self = this
    const h = window.innerHeight || document.documentElement.clientHeight
    const w = window.innerWidth || document.documentElement.clientWidth
    self.opt = {
        docWidth: w,
        docHeight: h,
        fontStyle: "20px 黑体", //水印字体设置
        rotateAngle: -20 * Math.PI / 180, //水印字体倾斜角度设置
        fontColor: "rgba(100, 100, 100, 0.1)", //水印字体颜色设置
        firstLinePositionX: -20, //canvas第一行文字起始X坐标
        firstLinePositionY: 80, //Y
        SecondLinePositionX: 0, //canvas第二行文字起始X坐标
        SecondLinePositionY: 70, //Y
        watermark: '水印'
        
    }
    Object.assign(self.opt, options)
    self.render(container)
    self.draw(self.opt.docWidth, self.opt.docHeight)
    self.events()
}

Watermark.prototype = {
    render: function(d) {
        let self = this
        d.append(c1, c2)
    },

    draw: function(docWidth, docHeight) {
        let self = this
        let cw = document.getElementById('watermark')
        let crw = document.getElementById('repeat-watermark')

        crw.width = docWidth
        crw.height = docHeight

        let ctx = cw.getContext("2d")
        //清除小画布
        ctx.clearRect(0, 0, 160, 100)
        ctx.font = self.opt.fontStyle
        //文字倾斜角度
        ctx.rotate(self.opt.rotateAngle)

        ctx.fillStyle = self.opt.fontColor
        //第一行文字
        ctx.fillText(self.opt.watermark, self.opt.firstLinePositionX, self.opt.firstLinePositionY)
        //第二行文字 
        //ctx.fillText(window.watermark.mobile, self.opt.SecondLinePositionX, self.opt.SecondLinePositionY)
        //坐标系还原
        ctx.rotate(-self.opt.rotateAngle)

        let ctxr = crw.getContext("2d")
        //清除整个画布
        ctxr.clearRect(0, 0, crw.width, crw.height)
        //平铺--重复小块的canvas
        let pat = ctxr.createPattern(cw, "repeat")
        ctxr.fillStyle = pat

        ctxr.fillRect(0, 0, crw.width, crw.height)
    },
    events: function() {
        let self = this
        window.addEventListener('resize', function() {
          const h = window.innerHeight || document.documentElement.clientHeight
          const w = window.innerWidth || document.documentElement.clientWidth
          self.draw(w, h)
        })
    }
}

export default Watermark