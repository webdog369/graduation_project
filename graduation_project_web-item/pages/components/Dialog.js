// components/Dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   title:{
     type:String,
     value:'输入有误!'
   },
   show:{
     type:Boolean,
     value:false
   },
    msg:{
      type:String,
      value:'确定'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close:function(){
      this.setData({
        show:false
      })
    }
  }
   
})
