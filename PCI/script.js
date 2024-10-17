let distressData = {}; // To hold data from Airfield_AC_Curve.xlsx
let distressTypes = [];
let severityLevels = [];

// Fetch distress types and severity levels from text files
fetch('Airfield_AC_Distress.txt')
    .then(response => response.text())
    .then(data => {
        distressTypes = data.trim().split('\n');
    })
    .catch(error => console.error('Error loading distress types:', error));

fetch('Severity.txt')
    .then(response => response.text())
    .then(data => {
        severityLevels = data.trim().split('\n');
    })
    .catch(error => console.error('Error loading severity levels:', error));


// Function to add a new row to the table
function addRow() {
    const tableBody = document.querySelector('#dynamicTable tbody');
    const newRow = document.createElement('tr');

    // Create the dropdown for Distress Type
    const distressCell = document.createElement('td');
    const distressSelect = document.createElement('select');
    distressTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.trim();
        option.textContent = type.trim();
        distressSelect.appendChild(option);
    });
    //distressSelect.onchange = calculateTotal; // Recalculate when dropdown changes
    distressCell.appendChild(distressSelect);
    newRow.appendChild(distressCell);

    // Create the dropdown for Severity
    const severityCell = document.createElement('td');
    const severitySelect = document.createElement('select');
    severityLevels.forEach(level => {
        const option = document.createElement('option');
        option.value = level.trim();
        option.textContent = level.trim();
        severitySelect.appendChild(option);
    });
    //severitySelect.onchange = calculateTotal; // Recalculate when dropdown changes
    severityCell.appendChild(severitySelect);
    newRow.appendChild(severityCell);

    // Create 10 Quantity input cells
    for (let i = 0; i < 10; i++) {
        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.className = 'quantity';
        //quantityInput.oninput = calculateTotal;
        quantityCell.appendChild(quantityInput);
        newRow.appendChild(quantityCell);
    }

    // Create Total, Density %, Deduct Value columns
    const totalCell = document.createElement('td');
    totalCell.className = 'total';
    newRow.appendChild(totalCell);

    const densityCell = document.createElement('td');
    densityCell.className = 'density';
    newRow.appendChild(densityCell);

    const deductValueCell = document.createElement('td');
    deductValueCell.className = 'deductValue';
    newRow.appendChild(deductValueCell);

    tableBody.appendChild(newRow);
}

// Function to remove the last row from the table
function removeRow() {
    const tableBody = document.querySelector('#dynamicTable tbody');
    if (tableBody.rows.length > 0) {
        tableBody.deleteRow(-1);
    }
}


// Function to load the Excel file (Airfield_AC_Curve.xlsx)
async function handleExcelFile() {
    try {
        const response = await fetch('Airfield_AC_Curve.xlsx');
        const data = await response.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });

        workbook.SheetNames.forEach(sheetName => {
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            distressData[sheetName] = sheetData; // Store sheet data in distressData
        });

         
    } catch (error) {
        console.error('Error fetching Excel file:', error);
    }
}


// Function to calculate the total for each row
async function calculateTotal() {
    // Load Excel data only once
    if (Object.keys(distressData).length === 0) {
        await handleExcelFile();
    }

    //await handleExcelFile();
    const rows = document.querySelectorAll('#dynamicTable tbody tr');
    rows.forEach(row => {
        const quantities = row.querySelectorAll('.quantity');
        let total = 0;
        quantities.forEach(quantity => {
            const value = parseFloat(quantity.value) || 0;
            total += value;
        });
        row.querySelector('.total').textContent = total;

        // Calculate Density % based on Unit Area from input
        const unitArea = parseFloat(document.getElementById('unitArea').value) || 1;
        const density = (total / unitArea) * 100;
        row.querySelector('.density').textContent = density.toFixed(2);


        // Update Deduct Value based on Distress Type, Severity, and Density
        //const distressType = row.querySelector('select').value;
        //const severity = row.querySelectorAll('select')[1].value;
        
		/*if (distressData[distressType]) {
            const deductValue = interpolate_Deduct_Value(density, distressType, severity);
            
            if (deductValue) {
                row.querySelector('.deductValue').textContent = deductValue.toFixed(2);
            } else {
                row.querySelector('.deductValue').textContent = 'N/A';
            }
        }*/

    });
}

function calculate_DV() {
    const rows = document.querySelectorAll('#dynamicTable tbody tr');
    rows.forEach(row => {
        const distressType = row.querySelector('select').value;
        const severity = row.querySelectorAll('select')[1].value;
        const density = parseFloat(row.querySelector('.density').textContent);
        
        const data = distressData[distressType]; //1-Alligator cracking
    
        if (!data) {
            //document.getElementById("result").innerText = "Selected distress data not found.";
            alert("Selected distress data not found.");
            return;
        }

        const densities = data.map(entry => entry.Density);
        const values = data.map(entry => entry[severity]);

		if (distressData[distressType]) {
            //const deductValue = LinearInterpolation(densities, values, density);
            const deductValue = cubicSplineInterpolation(densities, values, density);
            
            if (deductValue) {
                row.querySelector('.deductValue').textContent = deductValue.toFixed(2);
            } else {
                row.querySelector('.deductValue').textContent = 'N/A';
            }
        }

    });

}

function cubicSplineInterpolation(densities, values, density) {
    // Check if densities and values arrays are of equal length
    if (densities.length !== values.length) {
        throw new Error("Densities and values arrays must have the same length.");
    }

    // Check if the density is out of bounds
    if (density < densities[0] || density > densities[densities.length - 1]) {
        return 0; // Return 0 for out-of-bound densities
    }

    // Step 1: Compute the coefficients for cubic spline
    let n = densities.length - 1;
    let a = values.slice(); // coefficients of the spline
    let b = new Array(n), d = new Array(n), h = new Array(n), alpha = new Array(n);
    
    for (let i = 0; i < n; i++) {
        h[i] = densities[i + 1] - densities[i];
    }

    for (let i = 1; i < n; i++) {
        alpha[i] = (3 / h[i]) * (a[i + 1] - a[i]) - (3 / h[i - 1]) * (a[i] - a[i - 1]);
    }

    let c = new Array(n + 1).fill(0);
    let l = new Array(n + 1).fill(0);
    let mu = new Array(n + 1).fill(0);
    let z = new Array(n + 1).fill(0);

    l[0] = 1;
    mu[0] = 0;
    z[0] = 0;

    for (let i = 1; i < n; i++) {
        l[i] = 2 * (densities[i + 1] - densities[i - 1]) - h[i - 1] * mu[i - 1];
        mu[i] = h[i] / l[i];
        z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
    }

    l[n] = 1;
    z[n] = 0;
    c[n] = 0;

    for (let j = n - 1; j >= 0; j--) {
        c[j] = z[j] - mu[j] * c[j + 1];
        b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
        d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
    }

    // Step 2: Find the interval where density lies and evaluate the spline
    for (let i = 0; i < n; i++) {
        if (density >= densities[i] && density <= densities[i + 1]) {
            let deltaX = density - densities[i];
            return a[i] + b[i] * deltaX + c[i] * Math.pow(deltaX, 2) + d[i] * Math.pow(deltaX, 3);
        }
    }

    return 0; // Shouldn't happen since bounds are already checked
}


function LinearInterpolation(densities, values, density) {
    // Check if densities and values arrays are of equal length
    if (densities.length !== values.length) {
        throw new Error("Densities and values arrays must have the same length.");
    }

    // Check if the density is out of bounds
    if (density < densities[0] || density > densities[densities.length - 1]) {
        return 0; // Return 0 for out-of-bound densities
    }

    let result;
    // Find the interval where the density fits
    for (let i = 0; i < densities.length - 1; i++) {
        if (density >= densities[i] && density <= densities[i + 1]) {
            // Perform linear interpolation
            let t = (density - densities[i]) / (densities[i + 1] - densities[i]);
            result = values[i] + t * (values[i + 1] - values[i]);
        }
    }
    return result;
}

function Count_DV_GreaterThan_Five(DVs) {
    let count5 = 0;
    for(let i = 0; i< DVs.length; i++)
    {
        if(DVs[i] > 5.0)
        {
            count5++;
        }
    }

    return count5;
}

function Sum_Array(DVs) {
    let sum = 0;
    for(let i = 0; i< DVs.length; i++)
    {
        sum += DVs[i];
    }

    return sum;
}

function Calculate_Maximum_CDV(){

    let Max_CDV;
    const Individual_DVs = []; // Initialize an empty array to store the last column values

    const rows = document.querySelectorAll('#dynamicTable tbody tr');
    rows.forEach(row => {
        const Each_DV = parseFloat(row.querySelector('.deductValue').textContent);
        Individual_DVs.push(Each_DV);

    });

    const CountFives = Count_DV_GreaterThan_Five(Individual_DVs);

    if(CountFives <= 1)
    {
        Max_CDV = Sum_Array(Individual_DVs);
    }
    else
    {
        const HDV = Math.max(...Individual_DVs); //Highest DV
        let m = 1 + (9.0/95.0)*(100.0-HDV); //maximum allowable number of distresses less or equal to 10

        // Ensure m has a maximum value of 10
        m = Math.min(m, 10);

        generateTableRows_m();
        Populate_m_Table(HDV, m);

        generateTableRowsCDV();
        Max_CDV = populateCDVTable(Individual_DVs, m);
    }

    generateTableRowsPCI();
    PopulatePCITable(Max_CDV);
   
}

// Function to create PCI rating blocks for ASTM and FAA
function generatePCIRatings(astmRatings, faaRatings) {
    
    // Function to create rating blocks
    function createRatingBlock(rating, columnId, scaleFactor) {
        const column = document.getElementById(columnId);

        const ratingBlock = document.createElement('div');
        ratingBlock.classList.add('rating-block');

        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = rating.color;

        // Set height proportional to the PCI range
        const rangeParts = rating.range.split('-');
        const upperRange = parseInt(rangeParts[1]);
        const lowerRange = parseInt(rangeParts[0]);
        const height = (upperRange - lowerRange) * scaleFactor; // Scale to common height
        //colorBox.style.height = `${height}px`;

        ratingBlock.style.height = `${height}%`;


        // Add label inside the color box for the rating name
        const label = document.createElement('div');
        label.classList.add('label-inside');
        label.innerHTML = `${rating.name}`;

        // Add lower range outside the color box (left side)
        const lowerRangeLabel = document.createElement('div');
        lowerRangeLabel.classList.add('range-label');
        lowerRangeLabel.textContent = lowerRange;

        ratingBlock.appendChild(lowerRangeLabel); // Add the lower range label outside the box
        colorBox.appendChild(label);  // Add the label inside the color box
        ratingBlock.appendChild(colorBox); // Append color box to the block

        column.appendChild(ratingBlock);  // Append block to the respective column

         /*// Add upper range label on the left side (outside the color box)
         const upperRangeLabel = document.createElement('div');
         upperRangeLabel.classList.add('range-label');
         upperRangeLabel.textContent = upperRange; // Change to upper range
 
         ratingBlock.appendChild(upperRangeLabel);
         colorBox.appendChild(label);
         ratingBlock.appendChild(colorBox);
 
         column.appendChild(ratingBlock);*/
    }

    // Clear previous content if necessary
    document.getElementById('astm-column').innerHTML = '<h3>ASTM D5340/FAA PCI Ratings</h3>';
    document.getElementById('faa-column').innerHTML = '<h3>Scale 2 Ratings</h3>';

    const totalHeight = 500; // Total height for scaling (in pixels)
    // Calculate the scale factor for common height
     const scaleFactorASTM = totalHeight / 100; // Scale factor for ASTM ratings
     const scaleFactorFAA = totalHeight / 100;  // Scale factor for FAA ratings

    // Create ASTM ratings on the left
    astmRatings.forEach(rating => createRatingBlock(rating, 'astm-column', scaleFactorASTM));

    // Create FAA ratings on the right
    faaRatings.forEach(rating => createRatingBlock(rating, 'faa-column', scaleFactorFAA));
}

// Updated data for ASTM and FAA PCI Ratings with specified ranges and colors
const astmRatings = [
    { name: "", range: "100-100", color: "#006400" },  // Dark Green
    { name: "Good", range: "85-100", color: "#006400" },  // Dark Green
    { name: "Satisfactory", range: "70-85", color: "#8FBC8F" },  // Light Green
    { name: "Fair", range: "55-70", color: "#FFFF00" },  // Yellow
    { name: "Poor", range: "40-55", color: "#FF6347" },  // Light Red
    { name: "Very Poor", range: "25-40", color: "#FF4500" },  // Medium Red
    { name: "Serious", range: "10-25", color: "#8B0000" },  // Dark Red
    { name: "Failed", range: "0-10", color: "#A9A9A9" }   // Dark Grey
];

const faaRatings = [
    { name: "", range: "100-100", color: "#008000" },  // Green
    { name: "Good", range: "70-100", color: "#008000" },  // Green
    { name: "Fair", range: "55-70", color: "#FFFF00" },  // Yellow
    { name: "Poor", range: "0-55", color: "#FF0000" }   // Red
];

// Call the function to generate the PCI ratings on page load
generatePCIRatings(astmRatings, faaRatings);


// ASTM PCI Rating Function
function getASTMPCIRating(pci) {
    if (pci >= 85 && pci <= 100) {
        return { rating: "Good", color: "#006400" };
    } else if (pci >= 70 && pci < 85) {
        return { rating: "Satisfactory", color: "#8FBC8F" };
    } else if (pci >= 55 && pci < 70) {
        return { rating: "Fair", color: "#FFFF00" };
    } else if (pci >= 40 && pci < 55) {
        return { rating: "Poor", color: "#FF6347" };
    } else if (pci >= 25 && pci < 40) {
        return { rating: "Very Poor", color: "#FF4500" };
    } else if (pci >= 10 && pci < 25) {
        return { rating: "Serious", color: "#8B0000" };
    } else if (pci >= 0 && pci < 10) {
        return { rating: "Failed", color: "#A9A9A9" };
    } else {
        return { rating: "Invalid PCI value", color: "#f2f2f2" };
    }
}

// FAA PCI Rating Function
function getFAAPCIRating(pci) {
    if (pci >= 70 && pci <= 100) {
        return { rating: "Good", color: "#008000" };
    } else if (pci >= 55 && pci < 70) {
        return { rating: "Fair", color: "#FFFF00" };
    } else if (pci >= 0 && pci < 55) {
        return { rating: "Poor", color: "#FF0000" };
    } else {
        return { rating: "Invalid PCI value", color: "#f2f2f2" };
    }
}


function PopulatePCITable(Max_CDV){
    const tableBody = document.querySelector('#dynamicTablePCI tbody');

    const pci = (100 - Max_CDV).toFixed(2);
    let ASTMResult = getASTMPCIRating(pci);
    let FAAResult = getFAAPCIRating(pci);

    InsertOneDataIntoTable(tableBody, Max_CDV, 0, 0);
    InsertOneDataIntoTable(tableBody, pci, 0, 1);
    InsertOneDataIntoTable(tableBody, ASTMResult.rating, 0, 2);
    InsertOneDataIntoTable(tableBody, FAAResult.rating, 0, 3);

    changeCellColor(tableBody, ASTMResult.color, 0, 2);
    changeCellColor(tableBody, FAAResult.color, 0, 3);
}

function Populate_m_Table(HDV, m){
    const tableBody = document.querySelector('#dynamicTablem tbody');

    InsertOneDataIntoTable(tableBody, HDV, 0, 0);
    InsertOneDataIntoTable(tableBody, m.toFixed(2), 0, 1);
}

function changeCellColor(tableBody, color, rowNum, colNo) {
    // Get all rows in the tbody
    const rows = tableBody.getElementsByTagName('tr');

    // Ensure row number is within bounds
    if (rowNum < 0 || rowNum >= rows.length) {
        console.error("Invalid row number");
        return;
    }
    
    const targetRow = rows[rowNum]; // Get the specified row
    const cells = targetRow.getElementsByTagName('td');

    // Ensure column bounds are within range
    if (colNo < 0 || colNo >= cells.length) {
        console.error("Invalid column range");
        return [];
    }

    cells[colNo].style.backgroundColor = color;// Use color
}

function populateCDVTable(Individual_DVs, m) {
    const tableBody = document.querySelector('#dynamicTableCDV tbody');

    // Sort the Individual_DVs array in descending order
    const sortedDVs = [...Individual_DVs].sort((a, b) => b - a);

    // Get the integer and fractional part of m
    const mInt = Math.floor(m);
    const mFraction = m - mInt;

    let no_of_Dv_entries;
    let frac_use;
    if(Individual_DVs.length < m){
        no_of_Dv_entries = Individual_DVs.length;
        frac_use = false;
    }
    else{
        no_of_Dv_entries = mInt + 1;
        frac_use = true;
    }

    const Entered_DVs = []; //
    for(let i =0; i < no_of_Dv_entries; i++){
        Entered_DVs[i] = sortedDVs[i];
    }

    if(frac_use == true){
        Entered_DVs[no_of_Dv_entries-1] *= mFraction;
    }

    let rowNum;
    let total, q;
    let TDV_array = [];
    let q_array = [];
    let CDV_array = [];

    q = Count_DV_GreaterThan_Five(Entered_DVs);

    rowNum = 0;
    while(q!=0)
    {
        total = Sum_Array(Entered_DVs).toFixed(2);

        q_array[rowNum] = q;
        TDV_array[rowNum] = total;

        for(let i =1; i<=no_of_Dv_entries; i++)
        {
            InsertOneDataIntoTable(tableBody, Entered_DVs[i-1], rowNum, i);
        }
        InsertOneDataIntoTable(tableBody, total, rowNum, 11);
        InsertOneDataIntoTable(tableBody, q, rowNum, 12);
                
        let New_Five_Replaced_DVs  = Replace_Smallest_Value_Greater_Than5(Entered_DVs);
        for(let i = 0; i<no_of_Dv_entries; i++){
            if(Entered_DVs.length == New_Five_Replaced_DVs.length){
                Entered_DVs[i] = New_Five_Replaced_DVs[i];
            }
            else{
                alert("Not same length of array after replacement!");
            }
        }

        q = Count_DV_GreaterThan_Five(Entered_DVs);
        rowNum++;
    }

    //Calculate CDV for each row from curve in excel with sheet name = "CDV_AC"
    for(let i =0; i < q_array.length; i++)
    {
        //const distressType = row.querySelector('select').value;
        //const severity = row.querySelectorAll('select')[1].value;
        //const density = parseFloat(row.querySelector('.density').textContent);
        const TDV = TDV_array[i];
        const qq = "Q" + q_array[i];

        const data = distressData["CDV_AC"]; //Corrected DV curve
    
        if (!data) {
            alert("Selected distress data not found.");
            return;
        }

        const TDVs = data.map(entry => entry.Total);
        const qs = data.map(entry => entry[qq]);

		if (distressData["CDV_AC"]) {
            //const deductValue = LinearInterpolation(densities, values, density);
            const C_deductValue = cubicSplineInterpolation(TDVs, qs, TDV);
            
            if (C_deductValue) {
                CDV_array[i] = C_deductValue.toFixed(2);
            }
        }
    }

    for(let i =0; i<q_array.length; i++){
        InsertOneDataIntoTable(tableBody,CDV_array[i], i, 13);
    }
    
    Max_CDV = Math.max(...CDV_array); //Highest CDV
    return Max_CDV;
}

function Replace_Smallest_Value_Greater_Than5(Entered_DVs){

    let minGreaterThan5 = Math.min(...Entered_DVs.filter(value => value > 5));

    for(let i = Entered_DVs.length-1; i>=0; i--){
        if(Entered_DVs[i]==minGreaterThan5){
            Entered_DVs[i] = 5.0;
        }
    }

    return Entered_DVs;
}


function InsertOneDataIntoTable(tableBody, OneData, rowNum, colNo) {
    
    //const tableBody = document.querySelector('#dynamicTableCDV tbody');
    const rows = tableBody.getElementsByTagName('tr');

    // Ensure row number is within bounds
    if (rowNum < 0 || rowNum >= rows.length) {
        console.error("Invalid row number");
        return;
    }
    
    const targetRow = rows[rowNum]; // Get the specified row
    const cells = targetRow.getElementsByTagName('td');

    // Ensure column bounds are within range
    if (colNo < 0 || colNo >= cells.length) {
        console.error("Invalid column range");
        return [];
    }

    cells[colNo].textContent = OneData; // Use value from Entered_DVs or empty string
        
}

function generateTableRowsCDV() {
    const tableBody = document.querySelector('#dynamicTableCDV tbody');
    let tableContent = '';

    for (let i = 1; i <= 10; i++) {
        tableContent += '<tr>';
        tableContent += `<td>${i}</td>`;
        
        // Add 10 empty cells for Deduct Values
        for (let j = 0; j < 10; j++) {
            tableContent += '<td></td>';
        }
        
        // Add cells for Total, q, and CDV
        tableContent += '<td></td><td></td><td></td>';
        
        tableContent += '</tr>';
    }

    tableBody.innerHTML = tableContent;
}

function generateTableRowsPCI() {
    const tableBody = document.querySelector('#dynamicTablePCI tbody');
    let tableContent = '';

    // Create a single row with three empty columns
    tableContent += '<tr>';
    tableContent += '<td></td>';  // First empty column
    tableContent += '<td></td>';  // Second empty column
    tableContent += '<td></td>';  // Third empty column
    tableContent += '<td></td>';  // Fourth empty column
    tableContent += '</tr>';

    // Insert the generated row into the table body
    tableBody.innerHTML = tableContent;
}

function generateTableRows_m() {
    const tableBody = document.querySelector('#dynamicTablem tbody');
    let tableContent = '';

    // Create a single row with three empty columns
    tableContent += '<tr>';
    tableContent += '<td></td>';  // First empty column
    tableContent += '<td></td>';  // Second empty column
    tableContent += '</tr>';

    // Insert the generated row into the table body
    tableBody.innerHTML = tableContent;
}


// Detect changes in the Unit Area input and update the density and deduct value automatically
//document.getElementById('unitArea').addEventListener('input', calculateTotal);
