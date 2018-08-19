let model = {
    url: ""
}

model.present = function(data) {
    console.log("presenting data to change url", data)
    model.url = data.url
}