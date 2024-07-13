Page({
    data: {
        hello: "true hello"
    },
    change(){
        this.setData({
            hello: this.data.hello + 'new'
        })
    }
})