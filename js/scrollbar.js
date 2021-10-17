/* Input range - S 2021/09/20 */
function _Getagescrollbar(range,ln){
    let  return_agescrollbar;
    $.ajax({
        type: 'POST',
        url: './assets/capstone.json',
        async:false,
        success: function(value) {
            let value_agescrollbar;
            value_agescrollbar = value['agescrollbar'][0][range][0];
            return_agescrollbar = value_agescrollbar[ln][0];
        }
    });
    return return_agescrollbar;
}
    
const elem = document.querySelector("#ageInputId");
elem.onchange = e => {
    let data_agescrollbar;
    let val_age = parseInt($('#ageOutputId').val());
    
    if(val_age <= 10){
        // console.log('3~10',val_age);
        // 取得Age資料
        data_agescrollbar = _Getagescrollbar('3-10','en')
    } else if( 11 <= val_age && val_age <= 15){
        // console.log('11~15',val_age);
        // 取得Age資料
        data_agescrollbar = _Getagescrollbar('11-15','en')
    }  else if( 16 <= val_age && val_age <= 18){
        // console.log('16~18',val_age);
        // 取得Age資料
        data_agescrollbar = _Getagescrollbar('16-18','en')
    }

    // 顯示Age資料
    $('#img_age').attr('src',data_agescrollbar['img_src']);
    $('#ageModalHeader').text(data_agescrollbar['header']);
    $('#ageModalImg').attr('src',data_agescrollbar['img_src']);
    $('#ageModalContent').text(data_agescrollbar['content']);
    $('#ageModal').modal('show'); 
};
// ScrollBar Color
const input = document.querySelector("#ageInputId");

function getBackgroundSize(input) {
    const min = +input.min || 3;
    const max = +input.max || 18;
    const value = +input.value;
    const size = (value - min) / (max - min) * 100;
    return size;
}

function setBackgroundSize(input) {
    input.style.setProperty("--background-size", `${getBackgroundSize(input)}%`);
}

setBackgroundSize(input);

input.addEventListener("input", () => setBackgroundSize(input));

    /* Input range - E 2021/09/20 */