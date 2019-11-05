/*
Copyright 2019 Discloud
Todos os direitos reservados.

AVISO: A Discloud permite que você use, modifique e distribua esse arquivo em
de acordo com os termos do contrato de licença que acompanha
isto. Se você recebeu este arquivo de uma fonte diferente da Discloud,
então seu uso, modificação ou distribuição exige a prévia
permissão por escrito da Discloud.

*/

const fs = require('fs');

function usoRam() {
    try {
        let usoBytes = fs.readFileSync(`/sys/fs/cgroup/memory/memory.max_usage_in_bytes`).toString();
        return converter(usoBytes)
    } catch (err) {
       console.log("Dados não encontrados")
      }
}
function totalRam() {
    try {
        let totalBytes = fs.readFileSync(`/sys/fs/cgroup/memory/memory.limit_in_bytes`).toString();
        return converter(totalBytes)
    } catch (err) {
       console.log("Dados não encontrados")
      }
}


function converter(bytes) {
    let formatos = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0B';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if((bytes / Math.pow(1024, i)).toFixed(3).includes("000")) return Math.round(bytes / Math.pow(1024, i), 2) + formatos[i];
    return (bytes / Math.pow(1024, i)).toFixed(3) + ' ' + formatos[i];
}
module.exports = {
    usoRam,
    totalRam
 }
