<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default {
  name:'demo1',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      this.createScene() // 创建场景
      this.createMesh() // 创建网格模型
      this.createLight() // 创建光源
      this.createCamera() // 创建相机
      this.createRender() // 创建渲染器
      this.createControls() // 创建控件对象
      this.render() // 渲染
    },
    // 创建场景
    createScene () {
      this.scene = new THREE.Scene()
    },
    // 创建网格模型
    createMesh () {
      const geometry = new THREE.BoxGeometry(120, 120, 120) // 创建一个立方体几何对象Geometry
      const material = new THREE.MeshLambertMaterial({color: 0xe1e1e1}) // 材质对象Material,对光源会做出反射反应，不用的面颜色有区分
      //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      this.mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
      this.scene.add(this.mesh) // 网格模型添加到场景中
    },
    // 创建光源
    createLight () {
      // 点光源
      const point = new THREE.PointLight(0xffffff)
      point.position.set(400, 200, 300) // 点光源位置
      this.scene.add(point) // 点光源添加到场景中
      // 环境光
      const ambient = new THREE.AmbientLight(0x66600)
      this.scene.add(ambient)
    },
    // 创建相机
    createCamera () {
      const element = document.getElementById('container')
      const width = element.clientWidth // 窗口宽度
      const height = element.clientHeight // 窗口高度
      const k = width / height // 窗口宽高比
      const s = 500 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // OrthographicCamera(left, right, top, bottom, near, far)
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      //this.camera = new THREE.PerspectiveCamera( 450, width / height, 100, 1000 );
      
      this.camera.position.set(200, 300, 200) // 设置相机位置
      this.camera.lookAt(this.scene.position) // 设置相机方向
    },
    // 创建渲染器
    createRender () {
      const element = document.getElementById('container')
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(element.clientWidth, element.clientHeight) // 设置渲染区域尺寸
      this.renderer.setClearColor(0xdddddd, 1) // 设置背景颜色
      element.appendChild(this.renderer.domElement)
    },

    render () {
      this.renderer.render(this.scene, this.camera)
      // 通过requestAnimationFrame实现周期性调用render
      requestAnimationFrame(this.render)
    },
    // 创建控件对象
    createControls () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    }
  }
}
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

