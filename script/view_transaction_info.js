
function view_transaction_info() {
    if ($('#tx_id').val()) {
        console.log($('#tx_id').val());
        $.get(`http://161.246.38.104:7777/transactions/${$('#tx_id').val()}`, function (res) {
            console.log(res)
            const json = hljs.highlight('json', JSON.stringify(res.result, null, 4)).value
            const html = `
            <h5>Transacrtion Info. (RAW)</h5>
            <pre><code class="json">${json}</code></pre>
            `
            $('#result').html(html)
        });


    }

}