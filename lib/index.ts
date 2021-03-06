/*<function name="Player">*/
class Player {
  // #region 成员
  svg: SVGElement
  style: HTMLStyleElement
  options: IPlayerOptions
  records: IRecordEvent[] = []
  locusPath: SVGPathElement
  locusBackPath: SVGPathElement
  movingPoints: SVGGElement
  clickPoints: SVGGElement
  menuPoints: SVGGElement
  wheelPoints: SVGGElement
  doublePoints: SVGGElement
  dragPath: SVGPathElement
  current: SVGGElement
  // #endregion
  constructor(options: IPlayerOptions = {}) {
    this.options = { maxRecords: 100, hiddenCurrent: false, ...options }
  }
  /**
   * 窗体尺寸改变响应
   */
  handleResize = () => {
    let box = document.documentElement.getBoundingClientRect()
    this.svg.style.height = String(
      Math.max(box.height, document.documentElement.scrollHeight)
    )
  }
  /**
   * 开始播放
   */
  start() {
    if (this.svg) {
      return
    }
    let div = document.createElement('div')
    div.innerHTML = `<style>@-webkit-keyframes jcameras-player-dash{from{stroke-dashoffset:5}to{stroke-dashoffset:0}}@keyframes jcameras-player-dash{from{stroke-dashoffset:5}to{stroke-dashoffset:0}}.jcameras-player{z-index:2147483647;pointer-events:none;position:absolute;left:0;top:0;width:100%;box-sizing:border-box}.jcameras-player #mouse-double path,.jcameras-player #mouse-left path,.jcameras-player #mouse-middle path,.jcameras-player #mouse-right path{stroke:#000;fill:red}.jcameras-player #mouse path{fill:#fff}.jcameras-player #mouse path:nth-child(1){fill:#000}.jcameras-player .locus-back-path,.jcameras-player .locus-path{stroke:#000;fill:none}.jcameras-player .locus-back-path{stroke-dasharray:4 4;-webkit-animation:jcameras-player-dash .5s linear infinite;animation:jcameras-player-dash .5s linear infinite;stroke:#fff}.jcameras-player .drag-path{stroke:red;stroke-width:3;fill:none;stroke-dasharray:5 2}.jcameras-player .moving-points circle{stroke:none;fill:#000;opacity:.7}</style><svg class="jcameras-player" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <def>
    <g id="mouse" fill="#000000" fill-rule="nonzero">
      <path d="M27.78125,0 C24.5932617,0 22,2.59375 22,5.78125 L22,16.2519531 C10.0558472,16.7773437 0.5,26.6556396 0.5,38.7265625 L0.5,57.5 C0.5,69.90625 10.5932617,80 23,80 C35.4067383,80 45.5,69.90625 45.5,57.5 L45.5,38.7265625 C45.5,26.6556396 35.9441528,16.7773437 24,16.2519531 L24,5.78125 C24,3.6962891 25.6962891,2 27.78125,2 C29.8662109,2 31.5625,3.6962891 31.5625,5.78125 L31.5625,8.9345703 C31.5625,12.1220703 34.1557617,14.7158203 37.34375,14.7158203 C40.5317383,14.7158203 43.125,12.1220703 43.125,8.9345703 L43.125,1.3164062 C43.125,0.7636718 42.6772461,0.3164062 42.125,0.3164062 C41.5727539,0.3164062 41.125,0.7636718 41.125,1.3164062 L41.125,8.9345703 C41.125,11.0195312 39.4287109,12.7158203 37.34375,12.7158203 C35.2587891,12.7158203 33.5625,11.0195312 33.5625,8.9345703 L33.5625,5.78125 C33.5625,2.59375 30.9692383,0 27.78125,0 Z M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z M23,78 C11.6962891,78 2.5,68.8037109 2.5,57.5 L2.5,41 L17.5233765,41 C17.7588501,43.8169556 20.1228638,46.0390625 23,46.0390625 C25.8771362,46.0390625 28.2411499,43.8169556 28.4766235,41 L43.5,41 L43.5,57.5 C43.5,68.8037109 34.3037109,78 23,78 Z M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z" />
      <path d="M23,78 C11.6962891,78 2.5,68.8037109 2.5,57.5 L2.5,41 L17.5233765,41 C17.7588501,43.8169556 20.1228638,46.0390625 23,46.0390625 C25.8771362,46.0390625 28.2411499,43.8169556 28.4766235,41 L43.5,41 L43.5,57.5 C43.5,68.8037109 34.3037109,78 23,78 Z"/>
      <path d="M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z" />
      <path d="M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z" />
      <path d="M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z" />
    </g>
    <g id="mouse-right" transform="scale(0.3) translate(-25,-30)">
      <use xlink:href="#mouse"></use>
      <path d="M43.5,38.7265625 L43.5,39 L28.5,39 L28.5,35.2060547 C28.5,32.515686 26.5562134,30.2738648 24,29.8016358 L24,18.2772217 C34.8378906,18.803894 43.5,27.760376 43.5,38.7265625 Z" />
    </g>
    <g id="mouse-left" transform="scale(0.3) translate(-25,-30)">
      <use xlink:href="#mouse"></use>
      <path d="M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z" />
    </g>
    <g id="mouse-double" transform="scale(0.3) translate(-25,-30)">
      <use xlink:href="#mouse"></use>
      <path d="M22,18.2772217 L22,29.8016358 C19.4437866,30.2738648 17.5,32.5156861 17.5,35.2060547 L17.5,39 L2.5,39 L2.5,38.7265625 C2.5,27.760376 11.1621094,18.803894 22,18.2772217 Z" />
      <g transform="translate(-35,-10)" stroke="red">
        <rect x="51.157" y="4.625" width="1.5" height="7.908" />
        <rect x="51.157" y="19.145" width="1.5" height="7.908" />
        <rect x="40.693" y="15.089" width="7.908" height="1.5" />
        <rect x="55.213" y="15.089" width="7.908" height="1.5" />
        <rect x="56.291" y="8.729" transform="matrix(0.7071 0.7071 -0.7071 0.7071 24.2772 -37.1987)" width="1.5" height="3.953" />
        <rect x="46.023" y="18.995" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 65.0172 68.8759)" width="1.5" height="3.955" />
        <rect x="46.024" y="8.729" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 87.418 -14.7974)" width="1.5" height="3.955" />
        <rect x="56.291" y="18.996" transform="matrix(0.7071 -0.7071 0.7071 0.7071 1.8772 46.4769)" width="1.5" height="3.954" />
        <rect x="23.945" y="4.625" width="1.5" height="7.908" />
        <rect x="23.945" y="19.145" width="1.5" height="7.908" />
        <rect x="13.481" y="15.089" width="7.908" height="1.5" />
        <rect x="28" y="15.089" width="7.909" height="1.5" />
        <rect x="29.08" y="8.73" transform="matrix(0.7071 0.7071 -0.7071 0.7071 16.3073 -17.9569)" width="1.5" height="3.953" />
        <rect x="17.583" y="20.221" transform="matrix(0.7073 -0.7069 0.7069 0.7073 -9.0996 19.9658)" width="3.955" height="1.5" />
        <rect x="18.812" y="8.727" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.8397 16.968)" width="1.5" height="3.955" />
        <rect x="29.078" y="18.997" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 65.7501 14.7128)" width="1.5" height="3.954" />
      </g>
    </g>
    <g id="mouse-middle" transform="scale(0.3) translate(-25,-30)">
      <use xlink:href="#mouse" />
      <path d="M23,31.7060547 C24.9296875,31.7060547 26.5,33.2763672 26.5,35.2060547 L26.5,40.5390625 C26.5,42.46875 24.9296875,44.0390625 23,44.0390625 C21.0703125,44.0390625 19.5,42.46875 19.5,40.5390625 L19.5,35.2060547 C19.5,33.2763672 21.0703125,31.7060547 23,31.7060547 Z" />
    </g>
    <g id="mouse-pointer" transform="scale(0.2)">
      <path d="M89,43L12.3,10.1c-1.4-0.6-2.7,0.8-2.2,2.2L43,89c0.6,1.4,2.6,1.3,3.1-0.1l7.7-23l19.6,19.6c2.5,2.5,6.1,2.9,8.1,0.9  l4.8-4.8c2-2,1.6-5.6-0.9-8.1L65.8,53.8l23-7.7C90.3,45.6,90.4,43.6,89,43z" />
    </g>
  </def>
  <path class="locus-path" />
  <path class="locus-back-path" />
  <g class="moving-points" />
  <g class="click-points" />
  <path class="drag-path" />
  <g class="current" transform="translate(-1000,-1000)"><use xlink:href="#mouse-pointer" /></g>
</svg>`
    this.style = div.querySelector('style')
    document.body.appendChild(this.style)
    this.svg = div.querySelector('svg')
    document.body.appendChild(this.svg)
    this.locusPath = this.svg.querySelector('.locus-path')
    this.locusBackPath = this.svg.querySelector('.locus-back-path')
    this.movingPoints = this.svg.querySelector('.moving-points')
    this.clickPoints = this.svg.querySelector('.click-points')
    this.dragPath = this.svg.querySelector('.drag-path')
    this.current = this.svg.querySelector('.current')
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }
  /**
   * 结束播放
   */
  end() {
    if (!this.svg) {
      return
    }
    window.removeEventListener('resize', this.handleResize)
    this.style.parentNode.removeChild(this.style)
    this.svg.parentNode.removeChild(this.svg)
    this.svg = this.style = null
  }
  /**
   * 渲染图层
   */
  render() {
    if (!this.svg) {
      return
    }
    let box = document.documentElement.getBoundingClientRect()
    let locus = []
    let click = []
    let moving = []
    let drag = []
    let point
    let downPoint
    let upPoint
    this.records.forEach((item, index) => {
      let targetBox = item.target.getBoundingClientRect()
      if (!targetBox.width || !targetBox.height) {
        return
      }
      point = {
        x: item.position.x - box.left + targetBox.left,
        y: item.position.y - box.top + targetBox.top,
      }
      if (
        point.x < 0 ||
        point.y < 0 ||
        point.x > box.width ||
        point.y > Math.max(box.height, document.documentElement.scrollHeight)
      ) {
        return
      }
      locus.push(`${point.x},${point.y}`)
      switch (item.type) {
        case 'dblclick':
          click.push(
            `<use xlink:href="#mouse-double" transform="translate(${point.x},${
              point.y
            })" />`
          )
          break
        case 'mousedown':
          downPoint = point
          upPoint = null
          break
        case 'mouseup':
          upPoint = point
          if (downPoint) {
            drag.push(
              `M ${downPoint.x},${downPoint.y} L ${upPoint.x},${upPoint.y}`
            )
            downPoint = null
          }
          break
        case 'mousemove':
          moving.push(`<circle r="1.5" cx="${point.x}" cy="${point.y}" />`)
          if (item.button) {
            if (!downPoint) {
              downPoint = point
            }
            upPoint = point
          } else {
            if (downPoint && upPoint) {
              drag.push(
                `M ${downPoint.x},${downPoint.y} L ${upPoint.x},${upPoint.y}`
              )
              downPoint = null
            }
          }
          break
        case 'click':
          click.push(
            `<use xlink:href="#mouse-left" transform="translate(${point.x},${
              point.y
            })" />`
          )
          break
        case 'mousewheel':
          click.push(
            `<use xlink:href="#mouse-middle" transform="translate(${point.x},${
              point.y
            })" />`
          )
          break
        case 'contextmenu':
          click.push(
            `<use xlink:href="#mouse-right" transform="translate(${point.x},${
              point.y
            })" />`
          )
          break
      }
    })
    if (downPoint && upPoint) {
      drag.push(`M ${downPoint.x},${downPoint.y} L ${upPoint.x},${upPoint.y}`)
    }
    this.locusPath.setAttribute('d', locus.length ? `M${locus.join(' ')}` : '')
    this.locusBackPath.setAttribute(
      'd',
      locus.length ? `M${locus.join(' ')}` : ''
    )
    this.dragPath.setAttribute('d', drag.join(' '))
    this.movingPoints.innerHTML = moving.join('')
    this.clickPoints.innerHTML = click.join('')
    if (point && !this.options.hiddenCurrent) {
      this.current.setAttribute('transform', `translate(${point.x},${point.y})`)
    }
  }
  /**
   * 增加行为记录
   * @param record 行为记录
   */
  push(record: IRecordEvent) {
    if (!this.svg) {
      return
    }
    if (record.type === 'scroll') {
      if (this.options.fireEvent) {
        document.documentElement.scrollTop = record.scrollTop
        document.documentElement.scrollLeft = record.scrollLeft
      }
      return
    }
    if (!record.target) {
      return
    }
    this.records.push(record)
    while (this.records.length > this.options.maxRecords) {
      this.records.shift()
    }
    this.render()
    if (record.type === 'click' && this.options.fireEvent) {
      var clickEvent = document.createEvent('MouseEvents')
      clickEvent.initMouseEvent(
        'click',
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      record.target.dispatchEvent(clickEvent)
    }
  }
  /**
   * 清空画布
   */
  clear() {
    if (!this.svg) {
      return
    }
    this.records = []
    this.current.setAttribute('transform', `translate(-1000,-1000)`)
    this.render()
  }
} /*</function>*/
/*<function name="IPlayerOptions">*/
export interface IPlayerOptions {
  /** 最多显示的记录数 */
  maxRecords?: number
  /** 是否隐藏当前鼠标 */
  hiddenCurrent?: boolean
  /** 是否派发事件 */
  fireEvent?: boolean
} /*</function>*/
/*<function name="Recorder">*/
export const events = [
  'mousemove',
  'mousedown',
  'mouseup',
  'contextmenu',
  'click',
  'dblclick',
  'mousewheel',
  'scroll',
]
export interface IRecordEvent {
  /**
   * 事件类型
   */
  type:
    | 'mousemove'
    | 'mousedown'
    | 'mouseup'
    | 'contextmenu'
    | 'click'
    | 'dblclick'
    | 'mousewheel'
    | string
  /**
   * 元素坐标
   */
  target?: HTMLElement
  scrollLeft?: number
  scrollTop?: number
  /**
   * 坐标
   */
  position?: {
    /**
     * 鼠标在元素内坐标
     */
    x: number
    y: number
    /**
     * 鼠标在元素内比率坐标
     */
    tx: number
    ty: number
  }
  /**
   * 事件发生的时间
   */
  time: number
  /**
   * 滚动尺度
   */
  deltaX?: number
  deltaY?: number
  /**
   * 按钮
   */
  button?: number
  /**
   * 事件是否已经派发
   */
  fired?: boolean
}
export interface IRecorderOptions {
  thinning?: number
  onRecord?: {
    (event: IRecordEvent)
  }
  onStart?: { () }
  onEnd?: { () }
  onFilter?: { (element: HTMLElement): boolean }
}
class Recorder {
  // #region 成员
  options: IRecorderOptions
  /**
   * 记录开始时间
   */
  startAt: number = null
  lastRecord: IRecordEvent = null
  timer: any
  // #endregion
  constructor(options: IRecorderOptions = {}) {
    this.options = {
      thinning: 200,
      ...options,
    }
  }
  /**
   * 事件处理
   */
  handleEvent = (e: MouseEvent) => {
    // #region 事件记录
    if (!this.options.onRecord) {
      return
    }
    const { type, target } = e
    let node = target as Node
    while (
      node &&
      [Node.DOCUMENT_NODE, Node.ELEMENT_NODE].indexOf(node.nodeType) < 0
    ) {
      //text
      node = node.parentNode
    }
    let element = node as HTMLElement
    if (this.options.onFilter && !this.options.onFilter(element)) {
      return
    }
    let time = Date.now() - this.startAt
    let record: IRecordEvent
    if (type === 'scroll') {
      let ui = e as UIEvent
      record = {
        type: type,
        time: time,
        target: element,
        scrollLeft: document.documentElement.scrollLeft,
        scrollTop: document.documentElement.scrollTop,
      }
    } else {
      let box = element.getBoundingClientRect()
      let x = e.clientX - box.left
      let y = e.clientY - box.top
      record = {
        type: type,
        target: element,
        position: {
          x: x,
          y: y,
          tx: x / box.width,
          ty: y / box.height,
        },
        time: time,
        button:
          e.which ||
          (e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0),
      }
    }
    const emit = record => {
      if (record && !record.fired) {
        this.options.onRecord(record)
        record.fired = true
      }
    }
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    if ('mousewheel' === type) {
      record.deltaX = e['deltaX'] as number
      record.deltaY = e['deltaY'] as number
    }
    // 高频事件
    if (['mousemove', 'mousewheel'].indexOf(type) >= 0) {
      if (this.lastRecord) {
        // 有历史记录
        if (
          this.lastRecord.target === record.target &&
          this.lastRecord.button === record.button &&
          time - this.lastRecord.time <= this.options.thinning
        ) {
          this.timer = setTimeout(() => {
            this.timer = null
            this.lastRecord = null
            emit(record)
          }, this.options.thinning)
          return
        }
      } else {
        emit(record)
        this.lastRecord = record
        return
      }
    }
    emit(this.lastRecord)
    this.lastRecord = null
    // #endregion
    emit(record)
  }
  /**
   * 开始记录
   */
  start() {
    if (this.startAt) {
      return
    }
    this.startAt = Date.now()
    if (this.options.onStart) {
      this.options.onStart()
    }
    events.forEach(type => {
      document.addEventListener(type, this.handleEvent)
    })
  }
  /**
   * 结束记录
   */
  end() {
    if (!this.startAt) {
      return
    }
    this.startAt = null
    if (this.options.onEnd) {
      this.options.onEnd()
    }
    events.forEach(type => {
      document.removeEventListener(type, this.handleEvent)
    })
  }
} /*</function>*/
/*<function name="Parser">*/
const shortEvents = {
  mousemove: 'm',
  mousedown: 'd',
  mouseup: 'u',
  contextmenu: 'r',
  click: 'c',
  dblclick: 'l',
  mousewheel: 'w',
  scroll: 's',
}
class Parser {
  options: IParserOptions
  constructor(options: IParserOptions = {}) {
    this.options = {
      prefix: 'ca',
      version: 0,
      ...options,
    }
  }
  parse(expr: string): any {
    return null
  }
  stringify(session: ISession): string {
    function short(value: number, len: number) {
      return `000000000${(value || 0).toString(36)}`.slice(-len)
    }
    let result = `${this.options.prefix}${short(this.options.version, 2)}${
      session.session
    }${short(session.seq, 2)}${short(
      Math.floor(session.timestamp / 1000) % 2821109907455 /* {36}zzzzzzzz */,
      8
    )}${session.events
      .map(event => {
        let shortType = shortEvents[event.type]
        switch (shortType) {
          case 's':
            return `${shortType}`
          default:
            let pointEvent = event as IPointEvent
            return `${shortType}${short(pointEvent.position.x, 2)}${short(
              pointEvent.position.y,
              2
            )}`
        }
      })
      .join('!')}`
    return result
  }
} /*</function>*/
/*<function name="IParserOptions">*/
export interface ICommonEvent {
  type: string
  time: number
  path: string
  extend: number
}
export interface IPointEvent extends ICommonEvent {
  position: {
    x: number
    y: number
  }
}
export interface IScrollEvent extends ICommonEvent {
  scroll: {
    left: number
    top: number
  }
}
export interface IResizeEvent extends ICommonEvent {
  size: {
    width: number
    height: number
  }
}
export interface ISession {
  session: string
  seq: number
  timestamp: number
  events: ICommonEvent[]
}
export interface IParserOptions {
  prefix?: string
  version?: number
}
/*</function>*/
export { Player, Recorder, Parser }
