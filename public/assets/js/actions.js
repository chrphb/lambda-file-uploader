let actions = {}
console.log("loading actions")

function getSelectedFile() {
    let input = document.getElementById('file_input');
    console.log('Selected file: ' + input.files.item(0).name);
    let data = {}
    data.filename = input.files.item(0).name
    actions.getUploadUrl(data, model.present)
};

function sendFile() {
    // get the reference to the actual file in the input
    let theFormFile = $('#file_input').get()[0].files[0];

    $.ajax({
            type: 'PUT',
            url: model.url,
            headers: {"X-HTTP-Method-Override": "PUT"},             
            // Content type must much with the parameter you signed your URL with
            contentType: 'binary/octet-stream',
            // this flag is important, if not set, it will try to send data as a form
            processData: false,
            // the actual file is sent raw
            data: theFormFile,
            success: function(result) {
                console.log('File uploaded', result);
                alert('File uploaded')
            },
            error: function(ex) {
                console.log('Error, File NOT uploaded', ex);
                alert('Error, File NOT uploaded')
            }
        })

    return false;
}



actions.getUploadUrl = function(data, present) {
    $.ajax({
        url: config.gatewayUrl,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function(resp) {
            console.log("done", resp)
            present(resp)
            sendFile()
            //submitFile()
        }
    });
    return false
}
