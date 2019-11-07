
(async () => {
    model = await tf.loadLayersModel('model.json');
})();
let imgData;

function preprocess(imgData) {
    return tf.tidy(() => {
        //convert the image data to a tensor 
        let tensor = tf.browser.fromPixels(imgData, numChannels = 1);
        //resize to 28 x 28 
        const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
        // Normalize the image 
        const offset = tf.scalar(255.0);
        const normalized = tf.scalar(1.0).sub(resized.div(offset));
        //We add a dimension to get a batch shape 
        const batched = normalized.expandDims(0);
        return batched
    });
}

$('#image-selector').change(function () {
    let reader = new FileReader();
    reader.onload = function (e) {
        let dataURL = reader.result;
        $('#selected-image').attr("src", dataURL);
        base64Image = dataURL.replace("data:image/png;base64,", "");
    }
    reader.readAsDataURL($("#image-selector")[0].files[0]);
    $('#0').text("");
    $('#1').text("");
    $('#2').text("");
    $('#3').text("");
    $('#4').text("");
    $('#5').text("");
    $('#6').text("");
    $('#7').text("");
    $('#8').text("");
    $('#9').text("");
});
$('#predict-button').click(function (event) {
    let image = $('#selected-image').get(0);
    const pred = model.predict(preprocess(image)).dataSync();
    var index = 0;
    var largest = pred[0];
    for (var i = 0; i < pred.length; i++) {
        if (largest < pred[i]) {
            largest = pred[i];
            index = i;
        }
    }
    $('#0').text(pred[0].toFixed(4));
    $('#1').text(pred[1].toFixed(4));
    $('#2').text(pred[2].toFixed(4));
    $('#3').text(pred[3].toFixed(4));
    $('#4').text(pred[4].toFixed(4));
    $('#5').text(pred[5].toFixed(4));
    $('#6').text(pred[6].toFixed(4));
    $('#7').text(pred[7].toFixed(4));
    $('#8').text(pred[8].toFixed(4));
    $('#9').text(pred[9].toFixed(4));
    $('#abc').text(index);
    $('#per').text((largest*100).toFixed(2));
    $('#display-this1').show();
    $('#display-this2').show();
});