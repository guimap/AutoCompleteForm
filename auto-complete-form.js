/**
 * Created by guilherme on 19/04/16.
 */
(function( $ ){
    $.fn.autocompleteCep = function(params) {
        var cepField;
        var url  = "https://viacep.com.br/ws/";
        var form = $(this);

        console.log(params);

        //o cep e obrigatorio, portanto se nao houver, lança um erro.
        if(!params || !params.cep){
            throw "Informe qual será o campo do CEP - name field is missing 'cepfield'  ";
        }

        //Se houver o campo para cep, então eu crio um evento para ele.
        cepField = params.cep;

        //Registra um evento para auto completar
        jQuery(cepField).change(function(){
            var cepValue = jQuery(this).val();
            var urlRequest = url + cepValue + "/json";

            jQuery.ajax({
                url: urlRequest,
                success: function(data){
                    var dataResult = data;

                    //Verifica se existe o endereco
                    if(params.endereco){
                        $(form).find(params.endereco).val(dataResult.logradouro);
                    }

                    //Verifica se existe o bairro
                    if(params.bairro){
                        $(form).find(params.bairro).val(dataResult.bairro);
                    }

                    //Verifica se existe o cidade
                    if(params.cidade){
                        $(form).find(params.cidade).val(dataResult.localidade);
                    }

                    //Verifica se existe o estado
                    if(params.estado){
                        console.log("OK");
                        $(form).find(params.estado).val(dataResult.uf);
                    }


                }
            })
        });
        return this;
    };
})( jQuery );