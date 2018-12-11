function verify_message() {
    if ($('#contract_address').val() && $('#message').val()) {
        console.log($('#contract_address').val());

        const body = {
            "auth_id": "demo123",
            "auth_token": "123abc",
            "operation": "view",
            "contract_address": $('#contract_address').val()
        }

        $.post("http://161.246.38.104:7777/contracts", body, function (res, err) {
            console.log(res)
            const data_from_input = {
                message: $('#message').val(),
                hash: sha1($('#message').val())
            }
            const data_from_database = {
                message: res.result.database.current_message,
                hash: res.result.database.message_hash
            }
            const data_from_blockchain = {
                message: res.result.blockchain.lastData.current_message,
                hash: res.result.blockchain.lastData.message_hash
            }
            
            if(data_from_input.hash == data_from_database.hash && data_from_database.hash == data_from_blockchain.hash){
                $('#isMatch').html(`<h4><span class="badge badge-success">Matched</span></h4> <span> Contract Address: ${$('#contract_address').val()}</span>`)
            }
            else{
                $('#isMatch').html(`<h4><span class="badge badge-danger">Not Matched</span></h4> <span> Contract Address: ${$('#contract_address').val()}</span>`)
            }

            $('#output_table').html(`<table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">data from</th>
                    <th scope="col">user input</th>
                    <th scope="col">database</th>
                    <th scope="col">blockchain</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Message</th>
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

}