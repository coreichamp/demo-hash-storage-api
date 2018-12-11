function view_contract() {
    if($('#contract_address').val()){
        console.log($('#contract_address').val());

        const body = {
            "auth_id": "demo123",
            "auth_token": "123abc",
            "operation": "view",
            "contract_address": $('#contract_address').val()
        }

        $.post( "http://161.246.38.104:7777/contracts", body, function(res){
            console.log(res)
            $('#result_1').text("Contract Address: " + res.result.database.contract_address)
            $('#result_2').text("Current Message : " + res.result.database.current_message)
            $('#result_3').text("Message Hash : " + res.result.database.message_hash)
            $('#result_4').text("Create On: " + res.result.database.create_on)
            $('#result_5').text("Last Update: " + res.result.database.last_update)
            $('#result_6').text("This contract has update for " + res.result.blockchain.lastCounter + " times.")
        } );




    }
    
}