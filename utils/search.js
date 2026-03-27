export const searchQuery = (query)=>{

return {

title:{

$regex:query,
$options:"i"

}

};

};