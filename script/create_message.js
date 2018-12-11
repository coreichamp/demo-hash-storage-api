function create_contract() {
    if($('#message').val() && $('#note').val()){
        console.log($('#message').val());

        const body = {
            "auth_id": "demo123",
            "auth_token": "123abc",
            "operation": "create",
            "message": $('#message').val(),
            "note": $('#note').val()
        }

        $.post( "http://161.246.38.104:7777/contracts", body, function(res){
            console.log(res)
            $('#result_1').text("Your contact was create at \"" + res.result.contract_address + "\"")
            $('#result_2').text("Message hash: " + res.result.message_hash)
            $('#result_3').text("Transaction hash: " + res.result.last_tx)
        } );




    }
    
}