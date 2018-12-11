function update_contract() {
    if($('#contract_address').val() && $('#new_message').val()){
        console.log($('#contract_address').val())
        console.log($('#new_message').val())

        const body = {
            "auth_id": "demo123",
            "auth_token": "123abc",
            "operation": "update",
            "contract_address": $('#contract_address').val(),
            "new_message": $('#new_message').val()
        }

        $.post( "http://161.246.38.104:7777/contracts", body, function(res){
            console.log(res)
            $('#result_1').text("Contact \"" + $('#contract_address').val() + "\" was update.")
            $('#result_2').text("New Message: " + res.result.new_message)
            $('#result_3').text("New Message Hash: " + res.result.message_hash)
            $('#result_4').text("Transaction: " + res.result.last_tx)

        } );




    }
    
}