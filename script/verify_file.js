function verify_file(hashData, contract_address) {
    const body = {
        "auth_id": "demo123",
        "auth_token": "123abc",
        "operation": "view",
        "contract_address": `${$('#contract_address').val()}`
    }

    $.post("http://161.246.38.104:7777/contracts", body, function (res) {
        console.log(res)

            const data_from_input = {
                message: hashData,
                hash: sha1(hashData)
            }
            const data_from_database = {
                message: res.result.database.current_message,
                hash: res.result.database.message_hash
            }
            const data_from_blockchain = {
                message: res.result.blockchain.lastData.current_message,
                hash: res.result.blockchain.lastData.message_hash
            }

            if (data_from_input.hash == data_from_database.hash && data_from_database.hash == data_from_blockchain.hash) {
                $('#isMatch').html(`<h4><span class="badge badge-success">Matched</span></h4> <span> Contract Address: ${$('#contract_address').val()}</span>`)
            }
            else {
                $('#isMatch').html(`<h4><span class="badge badge-danger">Not Matched</span></h4> <span> Contract Address: ${$('#contract_address').val()}</span>`)
            }

            $('#output_table').html(`<table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">data from</th>
                    <th scope="col">Input file</th>
                    <th scope="col">database</th>
                    <th scope="col">blockchain</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">file hash</th>
                    <td>${data_from_input.message}</td>
                    <td>${data_from_database.message}</td>
                    <td>${data_from_blockchain.message}</td>
                </tr>
                <tr>
                    <th scope="row">hash</th>
                    <td>${data_from_input.hash}</td>
                    <td>${data_from_database.hash}</td>
                    <td>${data_from_blockchain.hash}</td>
                </tr>

            </tbody>
        </table>`)

    });
}

$('#form').submit(event => {
    event.preventDefault();
    const files = event.target.input_file.files
    const contract_address = event.target.contract_address

    var reader = new FileReader();
    reader.onload = function (e) {
        const result = e.srcElement.result
        const hashData = sha1(result)

        console.log(`File hash: ${hashData}`)
        verify_file(hashData, contract_address)
    };
    reader.readAsBinaryString(files[0])
})
