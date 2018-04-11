
// https://github.com/uzyn/ERC20-TST
const abi = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"showMeTheMoney","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]')
const decimals = 18
const tokenSymbol = 'TST'
smartContract = web3.eth.contract(abi);
contractInstance = smartContract.at('0x3efd578b271d034a69499e4a2d933c631d44b9ad');

function startApp() {
    var account = web3.eth.accounts[0];
    var accountInterval = setInterval(function() {
        if (web3.eth.accounts[0] !== account) {
            account = web3.eth.accounts[0];
            document.getElementById("address").innerHTML = account;

            web3.eth.getBalance(account, function (error, result) {
                if (error) {
                    document.getElementById("ethBalance").innerHTML = 'getBalance error: ${err}';
                } else {
                    document.getElementById("ethBalance").innerHTML = web3.fromWei(result);
                }
            });

            contractInstance.balanceOf.call(account, function (error, result) {
                if (error) {
                    document.getElementById("tokenBalance").innerHTML = 'balanceOf error: ${err}';
                } else {
                    document.getElementById("tokenBalance").innerHTML = (result * 10**-decimals) + ' ' + tokenSymbol;
                }
            });

            document.getElementById("tokenSymbol").innerHTML = tokenSymbol;
        }
    }, 100);  
}

function transferTokens() {
    var transferValue = document.getElementById("transferValue").value;
    var regex = /[0-9]|\./;
    if( !isNumeric(transferValue) ) {
        document.getElementById("transferResult").innerHTML = 'Invalid transfer value';
        return;
    }

    var transferValue = 100 * (10**decimals);
    contractInstance.transfer('0xCB12Af58Ca2c1ea24aEfB501489ACF25a7f497bb', transferValue, function (error, result) {
        if (error) {
            document.getElementById("transferResult").innerHTML = error;
        } else {
            document.getElementById("transferResult").innerHTML = result;
        }
    });
}

function isNumeric(value) {
    var regex = /[0-9]|\./;
    return regex.test(value);
}