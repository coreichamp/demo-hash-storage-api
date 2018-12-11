function create_contract_with_file(hashData, note) {
    const body = {
        "auth_id": "demo123",
        "auth_token": "123abc",
        "operation": "create",
        "message": `${hashData}`,
        "note": `${note}`
    }

    $.post("http://161.246.38.104:7777/contracts", body, function (res) {
        console.log(res)

        $('#result_1').html(`<span>Your contact was create at "${res.result.contract_address}" </span>`)
        $('#result_2').html(`<span>File hash: ${res.result.message_hash}</span>`)
        $('#result_3').html(`<span>Transaction hash: ${res.result.last_tx}</span>`)

    });
}

$('#form').submit(event => {
    event.preventDefault();
    const files = event.target.input_file.files
    const note = event.target.note

    var reader = new FileReader();
    reader.onload = function (e) {
        const result = e.srcElement.result
        const hashData = sha1(result)
        
        console.log(`File hash: ${hashData}`)
        create_contract_with_file(hashData, note)
    };
    reader.readAsBinaryString(files[0])
})
