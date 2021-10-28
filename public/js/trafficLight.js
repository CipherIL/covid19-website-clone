//vars
let tableData;
const $tableContent = document.querySelector('#traffic-light-table .table-content');
const $searchInput = document.getElementById('traffic-light-search-input');
const $sortButtons = document.querySelectorAll('#traffic-light-table button');
let timer;

//table data loader
const loadTableData = async ()=>{
    const response = await axios.get('/data/traffic-light');
    if(response.status === 200){
        tableData = response.data;
        sortTable('grade','descending')
        renderTableData(tableData);
    }
}

//table data renderer
const renderTableData = (data)=>{
    $tableContent.innerHTML = "";
    data.forEach((city)=>{
        const row = document.createElement('tr');
        row.classList.add('table-row');
        const sortedRowData = [];
        sortedRowData.push(city.city);
        sortedRowData.push(city.color);
        sortedRowData.push(city.grade);
        sortedRowData.push(city.newConfirmedPer100K);
        sortedRowData.push(city.positiveTestPrecentage);
        sortedRowData.push(city.confirmedRateOfGrowth);
        sortedRowData.push(city.activeIll);
        sortedRowData.forEach((data,i)=>{
            const dataElement = document.createElement('td');
            const rowItem = document.createElement('div');
            rowItem.classList.add('table-row-item-container');
            dataElement.innerHTML = data;
            if(i===0) {
                dataElement.classList.add('city-name');
                rowItem.classList.add('right');
            }
            if(i===1){
                dataElement.classList.add('grade-box');
                if(data==="ירוק") dataElement.classList.add('green');
                else if(data==="צהוב") dataElement.classList.add('yellow');
                else if(data==="כתום") dataElement.classList.add('orange');
                else dataElement.classList.add('red');
                dataElement.innerText = ""
            }
            if(i===2){
                dataElement.classList.add('daily-grade-box');
                if(data<4.5) dataElement.classList.add('green');
                else if(data<6) dataElement.classList.add('yellow');
                else if(data<7.5) dataElement.classList.add('orange');
                else dataElement.classList.add('red');
            }
            if(i<=5 && i>=3){
                rowItem.classList.add('dark');
            }
            rowItem.appendChild(dataElement);
            row.appendChild(rowItem);

        })
        $tableContent.appendChild(row);
    }) 
}

//table sort behaviour
const resetButtons = ()=>{
    $sortButtons.forEach((button)=>{
        button.children[1].classList.remove('show');
        button.children[1].children[0].classList.remove('ascending');
    })
}
$sortButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        if(button.children[1].classList.contains('show')){
            button.children[1].children[0].classList.toggle('ascending');
        }
        else{
            resetButtons()
            button.children[1].classList.add('show');
        }
        const sortCategory = button.id.replace('table-sort-','');
        const sortDirection = button.children[1].children[0].classList.contains('ascending')?
                              'ascending':'descending';
        sortTable(sortCategory,sortDirection);
        renderTableData(tableData);
    })
})
const sortTable = (category,direction)=>{
    tableData.sort(function tableSort(a,b){
        if(category==='activeIll'){
            const cmpA = a[category]==="קטן מ-15"?15:a[category]
            const cmpB = b[category]==="קטן מ-15"?15:b[category]
            console.log(cmpA,cmpB)
            if(direction==='ascending'){
                return cmpA>cmpB?1:-1;
            }
            else{
                return cmpA>cmpB?-1:1;
            }
        }
        else{
            if(direction==='ascending'){
                return a[category]>b[category]?1:-1;
            }
            else{
                return a[category]>b[category]?-1:1;
            }
        }
    })
}

//table search option
const resetTimer = ()=>{
    clearTimeout(timer);
    timer = setTimeout(searchInTable,200);
}
const searchInTable = ()=>{
    const inputText = $searchInput.value;
    if(inputText==="") renderTableData(tableData);
    else{
        const toRender = tableData.filter(obj=>obj.city.includes(inputText));
        renderTableData(toRender)
    }
}
$searchInput.addEventListener('input',()=>{
    resetTimer();
})

