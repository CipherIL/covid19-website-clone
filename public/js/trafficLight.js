//vars

//table data loader
const loadTableData = async ()=>{
    let tableData = await axios.get('/data/traffic-light');
    if(tableData.status === 200){
        tableData = tableData.data;
        console.log(tableData)
    }
}
//table sort behaviour

//table search option